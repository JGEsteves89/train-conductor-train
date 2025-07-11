<template>
	<v-card flat>
		<canvas ref="canvas" :width="canvasSize * 2" :height="canvasSize" @click="handleClick"
			style="border: none; display: block; margin: auto;"></canvas>
	</v-card>
</template>

<script>

export default {
	name: "ColorSequenceCanvasTest",
	components: {
	},
	props: {
		canvasSize: {
			type: Number,
			default: 320
		},
		order: {
			type: Array,
			default: () => [0, 1, 2]
		},
		arrowRange: {
			type: Array,
			default: () => [0.1, 0.5, 0.9]
		},
		startAngle: {
			type: Array,
			default: () => [0, 1, 2]
		},
		portions: {
			type: Array,
			default: () => [
				[0.5, 0.5, 0.5],
				[0.5, 0.5, 0.5],
				[0.5, 0.5, 0.5]
			]
		}
	},
	data() {
		return {
			radius: 50,
			spacing: 20,
			circles: [],
			expectedOrder: ["white", "black", "gray"],
			clickedColors: [],
			result: null, // null, 'success', 'fail'
			userAnswers: [],
		};
	},
	mounted() {
		this.userAnswers = Array(4).fill(null);
		this.setupCircles();
		this.drawCircles();
	},
	methods: {
		onAnswerSelected({ questionIndex, answer }) {
			this.$set(this.userAnswers, questionIndex, answer);
		},
		setupCircles() {
			const ctx = this.$refs.canvas.getContext("2d");
			this.radius = this.canvasSize * 2 / 3 / 2 * 0.6;
			this.spacing = this.canvasSize * 2 / 3 / 2 * 0.4;
			const offsetX = this.radius + this.spacing;
			this.circles = this.order.map((order, i) => ({
				x: offsetX + i * (this.radius * 2 + this.spacing),
				y: this.canvasSize / 2,
				color: this.expectedOrder[order],
				portions: this.portions[i],
				arrowRange: this.arrowRange[i],
				startAngle: this.startAngle[i]
			}));
		},
		drawCircles() {
			const ctx = this.$refs.canvas.getContext("2d");
			ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

			this.circles.forEach((circle, index) => {
				let startAngle = circle.startAngle;
				const total = circle.portions.reduce((p, c) => p + c, 0);
				let arrowAngle = 0;
				circle.portions.forEach((portion, i) => {
					const sliceAngle = (portion / total) * 2 * Math.PI;
					ctx.beginPath();
					ctx.moveTo(circle.x, circle.y);
					ctx.arc(circle.x, circle.y, this.radius, startAngle, startAngle + sliceAngle);
					ctx.fillStyle = this.expectedOrder[i];
					if (this.expectedOrder[i] === circle.color) {
						arrowAngle = startAngle + sliceAngle * circle.arrowRange;
					}
					ctx.fill();
					ctx.closePath();
					startAngle += sliceAngle;
				});
				ctx.strokeStyle = "black";
				ctx.lineWidth = 2;
				const ptArrowEnd = { x: circle.x + this.radius * 1.3 * Math.cos(arrowAngle), y: circle.y + this.radius * 1.1 * Math.sin(arrowAngle) };
				ctx.beginPath();
				ctx.moveTo(circle.x, circle.y);
				ctx.lineTo(ptArrowEnd.x, ptArrowEnd.y);
				ctx.stroke();
				ctx.closePath();

				ctx.beginPath();
				for (let i = 0; i < 3; i++) {
					const angle = arrowAngle + i * (2 * Math.PI / 3); // 120° apart
					const vx = ptArrowEnd.x + this.radius * 0.15 * Math.cos(angle);
					const vy = ptArrowEnd.y + this.radius * 0.15 * Math.sin(angle);
					if (i === 0) {
						ctx.moveTo(vx, vy);
					} else {
						ctx.lineTo(vx, vy);
					}
				}
				ctx.closePath();
				ctx.fillStyle = "black";
				ctx.fill();

				ctx.lineWidth = 1;
				ctx.font = "35px arial";
				ctx.fillText("LMR"[index], circle.x - this.radius, circle.y + this.radius * 1.5);

				// Draw border based on result
				if (this.result === "success") {
					ctx.strokeStyle = "green";
					ctx.lineWidth = 4;
				} else if (this.result === "fail") {
					ctx.strokeStyle = "red";
					ctx.lineWidth = 4;
				} else {
					ctx.strokeStyle = 'black';
				}

				ctx.beginPath();
				ctx.arc(circle.x, circle.y, this.radius, 0, Math.PI * 2);
				ctx.stroke();
				ctx.closePath();
			});
		},
		handleClick(event) {
			// do nothing...
		},
		reset() {
			this.clickedColors = [];
			this.result = null;
			this.drawCircles();
		}
	}
};
</script>

<style scoped>
canvas {
	touch-action: manipulation;
}
</style>
