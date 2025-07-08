<template>
	<div>
		<div class="text-center mb-2">
			<h2>Please count the number of {{ currentTest.what }} and select all instances of {{
				currentTest.searchLetters.join(', ') }}</h2>
		</div>
		<SoundPlayer :soundPath="currentTest.soundPath" @audio-play="handleAudioPlay" @audio-ended="handleAudioEnded" />

		<div class="text-center mb-2">
			<span v-if="listeningState === 'not-listened'">🎧 Not Listened</span>
			<span v-else-if="listeningState === 'listening'">🔊 Listening...</span>
			<span v-else>✅ Listened</span>
		</div>

		<div v-if="listeningState !== 'not-listened'" class="text-center mb-2">
			<TeaOccSymbolSearch v-if="currentTest" ref="symbolSearch" :searchLetters="currentTest.searchLetters"
				:lines="currentTest.lines" />
		</div>


		<div v-if="showSolution" class="text-center mb-2">
			<h3>The total the number of {{ currentTest.what }} is {{ currentTest.solution }}</h3>
		</div>


		<v-btn block color="primary" class="mb-4" @click="goToTest(testIndex + 1)"
			:disabled="listeningState !== 'listened'">
			New Test
		</v-btn>
	</div>
</template>

<script>
import SoundPlayer from '@/components/SoundPlayer.vue';
import TeaOccSymbolSearch from '@/components/TeaOccSymbolSearch.vue';

const TESTS = [
	{
		soundPath: "sounds/LowHighTones1.wav", solution: '34 ou 35 ou 36, não sei bem :)', what: "low tones", searchLetters: ['K'],
		lines: [
			'⚪ ⚪ 🔳 J 🔵 K ⚪ 🔶 T',
			'⬛ J 🔶 A 🔺 H 🔳 T 🔻',
			'K 🔻 T 🔶 U Q K M ⚪',
			'🔳 K ⚪ A 🔵 K ⚪ ⬛ 🔺',
			'🔶 H 🔻 Q J 🔻 U 🔳 ⚪',
			'M 🔶 J 🔻 A 🔳 🔶 J U',
			'H ⚪ K 🔺 ⬛ K ⚪ A Q',
			'🔻 K 🔻 Q 🔵 🔶 🔺 🔻 🔳',
			'🔶 M A 🔺 🔻 U 🔵 🔳 K',
			'K G 🔺 H ⚪ A 🔳 J 🔺',
			'Q 🔵 🔶 U H 🔵 🔳 K 🔶',
			'M 🔻 G K 🔶 K U 🔺 G',
			'F 🔻 Q A 🔵 G K H M',
			'🔺 M 🔳 Q K 🔳 🔻 Q N',
			'⬛ K ⚪ 🔶 J ⬛ T ⬛ A',
		],
	},
	{
		soundPath: "sounds/LowHighTones2.mp3", solution: '26', what: "low tones",
		searchLetters: ['K'],
		lines: [
			'🔻 T Q 🔶 M K 🔳 H',
			'⬛ U 🔵 K A J 🔺 ⚪',
			'🔶 🔳 G K 🔻 H 🔵 Q',
			'A ⚪ K 🔺 K ⬛ M 🔶',
			'🔳 T 🔶 Q H J 🔺 K',
			'G 🔺 K 🔵 Q 🔻 K ⬛',
			'⚪ 🔻 M A K 🔵 🔺 🔶',
			'U 🔳 H J 🔺 K Q 🔻',
			'K M 🔶 T 🔻 K J 🔺',
			'🔳 ⚪ 🔻 K M 🔵 A Q',
			'J ⬛ H 🔵 Q K 🔳 T',
			'K A ⚪ 🔻 🔶 M K 🔺',
			'G 🔵 T Q 🔳 K 🔺 J',
			'⬛ A 🔺 H K 🔵 J Q',
			'K 🔶 U ⬛ Q M 🔻 🔳',
		],
	},
	{
		soundPath: "sounds/LowHighTones1.wav", solution: '34', what: "high tones", searchLetters: ['K'],
		lines: [
			'🔳 H 🔻 K A 🔶 G 🔺',
			'K 🔵 Q U ⬛ 🔶 T K',
			'M A 🔻 🔳 K ⚪ 🔺 🔶',
			'Q 🔶 🔳 K J G K 🔵',
			'⬛ 🔻 A K 🔺 T Q 🔳',
			'K 🔶 M 🔺 H Q 🔻 K',
			'🔵 🔳 K J 🔻 M T ⬛',
			'A U 🔶 🔳 K ⚪ 🔻 H',
			'K 🔺 K 🔵 J Q 🔶 A',
			'⬛ M H T 🔺 K 🔳 🔻',
			'Q 🔵 J K 🔶 A K G',
			'K 🔳 Q U 🔶 🔻 J K',
			'M 🔻 🔳 ⚪ H K 🔺 A',
			'J T Q 🔵 K 🔶 K U',
			'⬛ K 🔳 J K G 🔻 T',
		],
	},
	{
		soundPath: "sounds/LowHighTones2.mp3", solution: 'I dont know', what: "high tones", searchLetters: ['K'],
		lines: [
			'T 🔻 🔳 H K A 🔶 Q',
			'🔳 🔺 K G 🔻 🔵 M ⬛',
			'K 🔶 A U J 🔵 K 🔻',
			'🔺 Q M K 🔳 🔶 H K',
			'J 🔵 🔶 🔻 K T G 🔳',
			'K A ⚪ ⬛ H 🔺 Q K',
			'M Q 🔳 K 🔻 🔺 🔵 T',
			'K 🔶 A Q 🔻 🔳 J G',
			'⬛ K 🔺 H 🔳 K M 🔻',
			'🔵 K T Q J 🔶 🔺 K',
			'A 🔻 M 🔶 K G Q 🔳',
			'🔳 K J 🔵 T Q K 🔺',
			'⬛ M K 🔻 H A K 🔶',
			'Q 🔳 🔻 J T 🔺 M K',
			'K ⚪ U 🔶 Q H 🔺 🔻',
		],
	},
	{
		soundPath: "sounds/textAboutDogs.mp3", solution: '32', what: "word dogs as mentioned", searchLetters: ['K'],
		lines: [
			'T 🔻 🔳 H K A 🔶 Q',
			'🔳 🔺 K G 🔻 🔵 M ⬛',
			'K 🔶 A U J 🔵 K 🔻',
			'🔺 Q M K 🔳 🔶 H K',
			'J 🔵 🔶 🔻 K T G 🔳',
			'K A ⚪ ⬛ H 🔺 Q K',
			'M Q 🔳 K 🔻 🔺 🔵 T',
			'K 🔶 A Q 🔻 🔳 J G',
			'⬛ K 🔺 H 🔳 K M 🔻',
			'🔵 K T Q J 🔶 🔺 K',
			'A 🔻 M 🔶 K G Q 🔳',
			'🔳 K J 🔵 T Q K 🔺',
			'⬛ M K 🔻 H A K 🔶',
			'Q 🔳 🔻 J T 🔺 M K',
			'K ⚪ U 🔶 Q H 🔺 🔻',
		],
	},
];

export default {
	name: "Test2Test",
	components: {
		SoundPlayer,
		TeaOccSymbolSearch,
	},
	props: {
		index: {
			type: String,
			default: '0',
		}
	},
	data() {
		return {
			listeningState: 'not-listened', // or 'listening', 'listened',
			showSolution: false
		};
	},
	computed: {
		testIndex() {
			let idx = parseInt(this.index, 10);
			return isNaN(idx) ? 0 : idx;
		},
		currentTest() {
			if (this.testIndex < 0 || this.testIndex >= TESTS.length) return null;
			return TESTS[this.testIndex];
		}
	},
	watch: {
		testIndex(newIndex) {
			if (newIndex < 0 || newIndex >= TESTS.length) {
				this.goToTest(0);
			} else {
				this.listeningState = 'not-listened'; // reset on test change
			}
		}
	},
	mounted() {
		if (this.testIndex < 0 || this.testIndex >= TESTS.length) {
			this.$router.push('/test2/')
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	},
	methods: {
		handleAudioPlay() {
			this.listeningState = 'listening';
		},
		handleAudioEnded() {
			this.listeningState = 'listened';
			console.log("Sound has ended!");
			this.$refs.symbolSearch.finishTest();
			setTimeout(() => {
				this.showSolution = true;
			}, 2000); // 1 second delay
		},
		goToTest(index) {
			this.$router.push('/test2/')
			this.$router.replace({ name: 'Test2Test', params: { index: index.toString() } });
		}
	}
};
</script>
