<template>
	<div class="question-container">
		<h3>{{ questionIndex + 1 }}. {{ questionData.question }}</h3>
		<v-radio-group v-model="localSelected" :disabled="disabled" @change="onSelect" column>
			<v-radio v-for="(answer, i) in questionData.multipleAnswers" :key="i" :label="answer" :value="i"
				:color="!disabled ? 'primary' : ''" :class="disabled ? getAnswerClass(i) : ''" class="answer-option" />
		</v-radio-group>
	</div>
</template>

<script>
export default {
	name: "MultipleAnswersQuestion",
	props: {
		questionData: { type: Object, required: true },
		questionIndex: { type: Number, required: true },
		selected: { type: Number, default: null },
		disabled: { type: Boolean, default: false }
	},
	data() {
		return {
			localSelected: this.selected
		};
	},
	watch: {
		selected(newVal) {
			this.localSelected = newVal;
		}
	},
	methods: {
		onSelect(value) {
			this.$emit("answer-selected", { questionIndex: this.questionIndex, answer: value });
		},
		getAnswerClass(i) {
			if (i === this.questionData.answer) return 'correct-answer';
			if (i === this.localSelected && i !== this.questionData.answer) return 'wrong-answer';
			return '';
		},
	}
};
</script>

<style scoped>
.answer-option {
	margin-bottom: 8px;
}

.correct-answer {
	color: #4caf50 !important;
}

.wrong-answer {
	color: #f44336 !important;
}
</style>
