<template>
	<v-container v-if="canvasConfigs.length" :key="testId">
		<!-- test questions -->
		<div v-for="(config, index) in canvasConfigs" :key="index" cols="4">
			<v-row justify="center" dense cols="4">
				<ColorSequenceCanvasTest :ref="setCanvasRef(index)" :canvas-size="320" :order="config.order"
					:arrow-range="config.arrowRange" :start-angle="config.startAngle" :portions="config.portions" />
			</v-row>
			<v-row justify="start" dense cols="4">
				<MultipleAnswersQuestion :questionData="config.question" :questionIndex="index"
					:selected="userAnswers[index]" @answer-selected="onAnswerSelected" :disabled="allIsAnswered" />
			</v-row>
		</div>

		<!-- summary -->
		<v-row v-if="allIsAnswered" justify="center" class="mt-4">
			<v-col cols="12" md="6" class="text-center">
				<v-alert type="success" border="left" colored-border elevation="2">
					✅ Correct: {{ correctCount }} &nbsp; | &nbsp;
					❌ Incorrect: {{ wrongCount }}
				</v-alert>
			</v-col>
		</v-row>

		<!-- button -->
		<v-btn block color="primary" class="mb-4" @click="resetAll">
			New Test
		</v-btn>
	</v-container>
</template>

<script>
import ColorSequenceCanvasTest from "@/components/ColorSequenceCanvasTest.vue";
import MultipleAnswersQuestion from "@/components/MultipleAnswersQuestion.vue";

export default {
	name: "Test4Test",
	components: {
		ColorSequenceCanvasTest,
		MultipleAnswersQuestion
	},
	data() {
		return {
			canvasRefs: [],
			canvasConfigs: [],
			userAnswers: [],
			testId: 0,
		};
	},
	created() {
		const count = 7;
		this.generateRandomConfigs(count);
		this.userAnswers = Array(count).fill(null);
	},
	computed: {
		allIsAnswered() {
			return this.userAnswers.every(answer => answer !== null);
		},
		correctCount() {
			return this.userAnswers.reduce((count, answer, i) => {
				const correct = this.canvasConfigs[i]?.question?.answer;
				return count + (answer === correct ? 1 : 0);
			}, 0);
		},
		wrongCount() {
			return this.userAnswers.length - this.correctCount;
		}
	},
	methods: {
		generateRandomConfigs(count) {
			this.canvasConfigs = Array.from({ length: count }, () => {
				const order = this.shuffle([0, 1, 2]);
				const arrowRange = [
					Math.random(),
					Math.random(),
					Math.random()
				];

				const startAngle = [
					Math.random() * 2 * Math.PI,
					Math.random() * 2 * Math.PI,
					Math.random() * 2 * Math.PI
				];

				const portions = Array.from({ length: 3 }, () =>
					this.randomNormalizedArray(3)
				);

				const allPossibleAnswers = ['LMR', 'LRM', 'RML', 'RLM', 'MRL', 'MLR'];
				let correctAnswer = '';
				for (const index of [0, 1, 2]) {
					const indexInOrder = order.indexOf(index);
					correctAnswer += 'LMR'[indexInOrder];
				}
				const shuffled = this.shuffle(allPossibleAnswers).filter(i => i !== correctAnswer);
				const multipleAnswers = this.shuffle([...shuffled.slice(0, 3), correctAnswer]);

				const question = {
					question: "What is the right answer?",
					multipleAnswers,
					answer: multipleAnswers.indexOf(correctAnswer)
				};
				return {
					order,
					arrowRange,
					startAngle,
					portions,
					question
				}
			});
		},
		shuffle(arr) {
			return arr.slice().sort(() => Math.random() - 0.5);
		},
		randomNormalizedArray(n) {
			const raw = Array.from({ length: n }, () => Math.random() + 0.1);
			const total = raw.reduce((a, b) => a + b, 0);
			return raw.map(x => x / total);
		},
		setCanvasRef(index) {
			return (el) => {
				if (el) this.canvasRefs[index] = el;
			};
		},
		resetAll() {
			this.canvasRefs.forEach(ref => ref?.reset?.());
			const count = this.canvasConfigs.length;
			this.generateRandomConfigs(count);
			this.userAnswers = Array(count).fill(null);
		},
		onAnswerSelected({ questionIndex, answer }) {
			this.$set(this.userAnswers, questionIndex, answer);
		},
		resetAll() {
			this.canvasRefs = []; // Clear refs
			const count = this.canvasConfigs.length;
			this.generateRandomConfigs(count);
			this.userAnswers = Array(count).fill(null);
			this.testId++; // Force full re-render
		},
	}
};
</script>
