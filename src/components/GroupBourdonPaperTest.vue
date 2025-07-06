<template>
	<v-container>
		<v-row justify="center" style="margin-top: 0; margin-bottom: 8px;">
			<v-col cols="12" md="6" class="text-center" style="margin-bottom: 0;">
				<h2 style="margin-bottom: 4px;">Group Bourdon Paper Test</h2>
				<div style="margin-top: 0;">Time left: {{ timeLeft }}s</div>
			</v-col>
			<v-col cols="12" md="6" class="text-center" style="padding-top: 0; padding-bottom: 0;">
				<div style="margin-top: 0; margin-bottom: 0;">
					Search for: {{ searchLetters.join(', ') }}
				</div>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12" md="8">
				<v-sheet elevation="2" class="pa-4">
					<div v-for="(line, lineIndex) in parsedLines" :key="lineIndex" class="d-flex align-center mb-3">
						<!-- Line number -->
						<div style="min-width: 32px;" class="text-right mr-3 font-weight-bold">
							{{ lineIndex + 1 }}
						</div>

						<!-- Letters container -->
						<div class="d-flex justify-space-between" style="flex-grow: 1;">
							<div v-for="(letterObj, letterIndex) in line" :key="letterIndex"
								@click="handleClick(lineIndex, letterIndex)" :class="letterClass(letterObj)"
								class="text-center" style="cursor: pointer; flex: 1;">
								{{ letterObj.letter }}
							</div>
						</div>
					</div>
				</v-sheet>
			</v-col>
		</v-row>

		<v-row justify="center" class="mt-4">
			<v-col cols="12" md="6" class="text-center" v-if="testFinished">
				<v-alert type="success" border="left" colored-border elevation="2">
					✅ Correct: {{ results.correct }} &nbsp; | &nbsp;
					❌ Incorrect: {{ results.incorrect }} &nbsp; | &nbsp;
					⚠️ Missed: {{ results.missed }}
				</v-alert>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "GroupBourdonPaperTest",
	props: {
		searchLetters: {
			type: Array,
			required: true,
		},
		lines: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			parsedLines: [], // will be [{ letter, clicked, status }]
			timeLeft: 60,
			timer: null,
			testFinished: false,
			results: {
				correct: 0,
				incorrect: 0,
				missed: 0,
			},
		};
	},
	methods: {
		initializeTest() {
			this.parsedLines = this.lines.map((line) =>
				line.trim().split(/\s+/).map((letter) => ({
					letter,
					clicked: false,
					status: null, // null | 'correct' | 'incorrect' | 'missed'
				}))
			);
		},
		handleClick(lineIndex, letterIndex) {
			if (this.testFinished) return;
			const letterObj = this.parsedLines[lineIndex][letterIndex];
			letterObj.clicked = !letterObj.clicked;
		},
		letterClass(letterObj) {
			let classes = [];
			if (letterObj.clicked && !this.testFinished) {
				classes.push("text--disabled");
				classes.push("text-decoration-line-through");
			}
			if (this.testFinished) {
				if (letterObj.status === "correct") {
					classes.push("green--text");
				} else if (letterObj.status === "incorrect") {
					classes.push("red--text");
				} else if (letterObj.status === "missed") {
					classes.push("orange--text");
				}
			}
			return classes;
		},
		finishTest() {
			let correct = 0;
			let incorrect = 0;
			let missed = 0;

			this.parsedLines.forEach((line) => {
				if (line.find(o => o.clicked)) {
					line.forEach((obj) => {
						const isTarget = this.searchLetters.includes(obj.letter);
						if (isTarget && obj.clicked) {
							obj.status = "correct";
							correct++;
						} else if (!isTarget && obj.clicked) {
							obj.status = "incorrect";
							incorrect++;
						} else if (isTarget && !obj.clicked) {
							obj.status = "missed";
							missed++;
						} else {
							obj.status = null;
						}
					});
				}
			});

			this.results = { correct, incorrect, missed };
			this.testFinished = true;
		},
		startTimer() {
			this.stopTimer();
			this.timeLeft = 60;
			this.timer = setInterval(() => {
				if (this.timeLeft > 0) {
					this.timeLeft--;
				} else {
					this.stopTimer();
					this.finishTest();
				}
			}, 1000);
		},
		stopTimer() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		resetTest() {
			this.stopTimer();
			this.testFinished = false;
			this.results = { correct: 0, incorrect: 0, missed: 0 };
			this.initializeTest();
			this.startTimer();
		},
	},
	watch: {
		searchLetters() {
			this.resetTest();
		},
		lines() {
			this.resetTest();
		},
	},
	mounted() {
		this.initializeTest();
		this.startTimer();
	},
	beforeDestroy() {
		this.stopTimer();
	},
};
</script>

<style scoped>
.text-decoration-line-through {
	text-decoration: line-through;
}
</style>
