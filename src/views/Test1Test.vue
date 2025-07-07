<template>
	<div>
		<GroupBourdonPaperTest v-if="currentTest" :searchLetters="currentTest.searchLetters" :lines="currentTest.lines"
			@test-finished="onTestFinished" />
		<v-btn block color="primary" class="mb-4" @click="goToTest(testIndex + 1)">
			New Test
		</v-btn>
	</div>
</template>

<script>
import GroupBourdonPaperTest from '../components/GroupBourdonPaperTest.vue';

const TESTS = [
	{
		searchLetters: ['D'],
		lines: [
			'B D G P B O Q D O P B P G D P B O G Q P D B',
			'G P O D Q G B O D Q P G O B Q D P D B O G Q',
			'D D P O B D D G O Q B D O G P B G Q D Q P B',
			'P Q O B G O P B D P O Q P D Q P D O B G P P',
			'D Q B P D G B D P D B P D Q G Q D P O Q P Q',
			'D B P D Q O G B Q O D B G D P O G Q P O G D',
			'Q O D Q B O Q D Q P B O P Q B O P O O B G O',
			'O Q P B P D G O D O G B D Q O B P D P Q B D',
			'B G Q D Q P B G O Q O G O Q O O Q P G O B O',
			'O D D P Q B O Q P D O Q B G Q B G D O D Q G',
			'P Q G O D O Q P B Q P D G O P D O Q B G O P',
			'D O Q O B Q D G O D Q B G D B Q O D B Q D P',
			'O P O Q D P B O B Q P B O D Q D Q B G O B G',
			'Q B D Q O D P B O G Q G D P Q G B O D Q G O',
			'G P B Q P O Q D D B Q G B O D Q G D P B O Q',
			'D O P O B G O P B Q D Q P G Q B D P O G Q P',
			'Q G O D P D Q B O D O P Q B Q D P D Q O B D',
			'P D Q O P B O P D G B P O D P B Q P D B O P',
			'B Q P D O P D Q G O Q D P G O Q D G Q D P O',
			'O Q B Q O D G O D B G P D O D Q P O B G Q B',
		],
	},
	{
		searchLetters: ['b'],
		lines: [
			'B D d b B O Q D O d B d b D p B O d Q b D B',
			'd b O D Q d B O D Q b d O B Q D b D B O d Q',
			'O D b O B D D b O Q B D O b d B b Q D Q d B',
			'D Q O B d O d B D b O Q b D Q d D O B d D b',
			'D Q B d D b B D b O B d O Q b Q D d O Q b Q',
			'b B d D Q O d B Q O D B d D b O d Q b O b D',
			'Q O D Q B O Q D Q d B O b Q B D b O D B d O',
			'O Q d B P D b O D O d B D Q O B b D d Q B d',
			'B d Q D Q b B d O Q D d O Q D O Q b b O B D',
			'O D D B Q B O Q B D O Q B d Q B d D O D Q B',
			'b Q b O D O Q d B Q b D d O b D O Q B d O d',
			'D O Q O B Q D b O D Q B d D B Q O D B Q D b',
			'O b O Q D d B O B Q b B O D Q D Q B d O B d',
			'Q B D Q O D d B O b Q b D b Q d B O D Q b O',
			'd d B Q b O Q D D B Q d B O D Q b D d B O Q',
			'D O b O B d O b B Q D Q d b Q B D b O d Q d',
			'Q b O D b D Q B O D O b Q B Q D d D Q O B D',
			'd D Q O b B O b D d B d O D d B Q b D B O b',
			'B Q b D O d D Q b O Q D b d O Q D d Q D b O',
			'O Q B Q O D d O D B b b D O D Q d O B d Q B',
		],
	},
	{
		searchLetters: ['U', 'v'],
		lines: [
			'U v U u V O Q v O U v u v U V u O v Q U V v',
			'u U O V Q V v O u Q V u O V Q U v u v O U Q',
			'O V u O v U V u O Q v V O U u v u Q U Q V V',
			'V Q O U v O u u v U O Q v V Q u V O U U v u',
			'U Q u v U v V v u O V u O Q u Q v u O Q u Q',
			'U V u U Q O v U Q O U V u v u O U Q V O u v',
			'Q O v Q U O Q v Q V u O V Q v u U O u v u O',
			'O Q u V u U V O v O u v U Q O U V v u Q V U',
			'U u Q v Q U v V O Q V u O Q u O Q U V O U V',
			'O v u V Q V O Q u V O Q v U Q V u u O v Q U',
			'U Q V O v O Q u V Q V V u O V v O Q v U O V',
			'V O Q O V Q u u O U Q v G V u Q O U v Q V u',
			'O u O Q U v V O u Q u V O v Q V Q U U O u v',
			'Q V v Q O U u v O V Q u V v Q U u O v Q u O',
			'U V U Q V O Q v v U Q V v O u Q u V U u O Q',
			'V O u O v v O V u Q V Q u v Q v u U O v Q V',
			'Q v O u U V Q v O u O u O v Q V v u Q O u U',
			'U v Q O v U O V u G v V O v U u Q V U u O V',
			'u Q u v O V U Q v u Q v U V O Q V U Q v U O',
			'O Q V Q O U G O u u G V v O U Q u O V u Q V',
		],
	},
	{
		searchLetters: ['G'],
		lines: [
			'B D G P B O Q D O P B P G D P B O G Q P D B',
			'G P O D Q G B O D Q P G O B Q D P D B O G Q',
			'D D P O B D D G O Q B D O G P B G Q D Q P B',
			'P Q O B G O P B D P O Q P D Q P D O B G P P',
			'D Q B P D G B D P D B P D Q G Q D P O Q P Q',
			'D B P D Q O G B Q O D B G D P O G Q P O G D',
			'Q O D Q B O Q D Q P B O P Q B O P O O B G O',
			'O Q P B P D G O D O G B D Q O B P D P Q B D',
			'B G Q D Q P B G O Q O G O Q O O Q P G O B O',
			'O D D P Q B O Q P D O Q B G Q B G D O D Q G',
			'P Q G O D O Q P B Q P D G O P D O Q B G O P',
			'D O Q O B Q D G O D Q B G D B Q O D B Q D P',
			'O P O Q D P B O B Q P B O D Q D Q B G O B G',
			'Q B D Q O D P B O G Q G D P Q G B O D Q G O',
			'G P B Q P O Q D D B Q G B O D Q G D P B O Q',
			'D O P O B G O P B Q D Q P G Q B D P O G Q P',
			'Q G O D P D Q B O D O P Q B Q D P D Q O B D',
			'P D Q O P B O P D G B P O D P B Q P D B O P',
			'B Q P D O P D Q G O Q D P G O Q D G Q D P O',
			'O Q B Q O D G O D B G P D O D Q P O B G Q B',
		],
	},
	{
		searchLetters: ['d'],
		lines: [
			'B D d b B O Q D O d B d b D p B O d Q b D B',
			'd b O D Q d B O D Q b d O B Q D b D B O d Q',
			'O D b O B D D b O Q B D O b d B b Q D Q d B',
			'D Q O B d O d B D b O Q b D Q d D O B d D b',
			'D Q B d D b B D b O B d O Q b Q D d O Q b Q',
			'b B d D Q O d B Q O D B d D b O d Q b O b D',
			'Q O D Q B O Q D Q d B O b Q B D b O D B d O',
			'O Q d B P D b O D O d B D Q O B b D d Q B d',
			'B d Q D Q b B d O Q D d O Q D O Q b b O B D',
			'O D D B Q B O Q B D O Q B d Q B d D O D Q B',
			'b Q b O D O Q d B Q b D d O b D O Q B d O d',
			'D O Q O B Q D b O D Q B d D B Q O D B Q D b',
			'O b O Q D d B O B Q b B O D Q D Q B d O B d',
			'Q B D Q O D d B O b Q b D b Q d B O D Q b O',
			'd d B Q b O Q D D B Q d B O D Q b D d B O Q',
			'D O b O B d O b B Q D Q d b Q B D b O d Q d',
			'Q b O D b D Q B O D O b Q B Q D d D Q O B D',
			'd D Q O b B O b D d B d O D d B Q b D B O b',
			'B Q b D O d D Q b O Q D b d O Q D d Q D b O',
			'O Q B Q O D d O D B b b D O D Q d O B d Q B',
		],
	},
	{
		searchLetters: ['O', 'u'],
		lines: [
			'U v U u V O Q v O U v u v U V u O v Q U V v',
			'u U O V Q V v O u Q V u O V Q U v u v O U Q',
			'O V u O v U V u O Q v V O U u v u Q U Q V V',
			'V Q O U v O u u v U O Q v V Q u V O U U v u',
			'U Q u v U v V v u O V u O Q u Q v u O Q u Q',
			'U V u U Q O v U Q O U V u v u O U Q V O u v',
			'Q O v Q U O Q v Q V u O V Q v u U O u v u O',
			'O Q u V u U V O v O u v U Q O U V v u Q V U',
			'U u Q v Q U v V O Q V u O Q u O Q U V O U V',
			'O v u V Q V O Q u V O Q v U Q V u u O v Q U',
			'U Q V O v O Q u V Q V V u O V v O Q v U O V',
			'V O Q O V Q u u O U Q v G V u Q O U v Q V u',
			'O u O Q U v V O u Q u V O v Q V Q U U O u v',
			'Q V v Q O U u v O V Q u V v Q U u O v Q u O',
			'U V U Q V O Q v v U Q V v O u Q u V U u O Q',
			'V O u O v v O V u Q V Q u v Q v u U O v Q V',
			'Q v O u U V Q v O u O u O v Q V v u Q O u U',
			'U v Q O v U O V u G v V O v U u Q V U u O V',
			'u Q u v O V U Q v u Q v U V O Q V U Q v U O',
			'O Q V Q O U G O u u G V v O U Q u O V u Q V',
		],
	},
];

export default {
	name: "Test1Test",
	components: {
		GroupBourdonPaperTest,
	},
	props: {
		index: {
			type: String,
			default: '0',
		}
	},
	computed: {
		testIndex() {
			// parse index from route param
			let idx = parseInt(this.index, 10);
			if (isNaN(idx)) idx = 0;
			return idx;
		},
		currentTest() {
			if (this.testIndex < 0 || this.testIndex >= TESTS.length) {
				return null;
			}
			return TESTS[this.testIndex];
		}
	},
	watch: {
		// watch index prop to detect invalid index and redirect
		testIndex(newIndex) {
			if (newIndex < 0 || newIndex >= TESTS.length) {
				this.goToTest(0);
			}
		}
	},
	mounted() {
		if (this.testIndex < 0 || this.testIndex >= TESTS.length) {
			$router.push('/test1/')
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	},
	methods: {
		onTestFinished() {
			// Go to next test index, loop back if needed
			let nextIndex = (this.testIndex + 1) % TESTS.length;
			this.goToTest(nextIndex);
		},
		goToTest(index) {
			// navigate to /test1/start/:index
			this.$router.replace({ name: 'Test1Test', params: { index: index.toString() } });
		}
	}
};
</script>
