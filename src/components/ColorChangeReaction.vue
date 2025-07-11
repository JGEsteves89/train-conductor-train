<template>
	<div>

		<v-card flat>
			<canvas ref="canvas" :width="canvasSize" :height="canvasSize" @click="handleClick"
				style="border: none; display: block; margin: auto;"></canvas>
			<v-card-text class="text-center">
				<div v-if="this.results.length">
					Last Reaction: {{ this.results[this.results.length - 1] }} ms
				</div>
				<div v-if="averageReaction !== null">
					Average Reaction: {{ averageReaction }} ms —
					<strong>{{ classification }}</strong>
				</div>
			</v-card-text>

		</v-card>
		<v-btn block color="green" @click="handleClick" height="80" class="mt-4">

		</v-btn>
	</div>
</template>

<script>
export default {
	name: "ColorChangeReaction",
	props: {
		canvasSize: {
			type: Number,
			default: 320,
		},
	},
	data() {
		return {
			marginPortion: 0.2,
			results: [],
			flashing: true,
			darkFlash: false,
			darkFlashStartTime: null,
			flashInterval: null,
			countAverage: 5,
			count: 0,
			framesToDark: 0,
		};
	},
	computed: {
		averageReaction() {
			if (!this.results.length) return null;
			const sum = this.results.reduce((a, b) => a + b, 0);
			return Math.round(sum / this.results.length);
		},
		classification() {
			const avg = this.averageReaction;
			if (avg === null) return "No data";
			if (avg <= 400) return "Good";
			if (avg <= 600) return "Average";
			return "Bad";
		},
	},
	mounted() {
		this.flashInterval = setInterval(() => {
			this.draw();
			this.count++;
		}, 500); // 2 Hz
	},
	beforeDestroy() {
		clearInterval(this.flashInterval);
	},
	methods: {
		draw() {
			const ctx = this.$refs.canvas.getContext("2d");
			ctx.clearRect(0, 0, this.canvasSize * 2, this.canvasSize);
			const margin = this.canvasSize * this.marginPortion;
			const width = this.canvasSize;
			const height = this.canvasSize;
			const squareSize = width - 2 * margin;
			const x = width / 2 - squareSize / 2;
			const y = height / 2 - squareSize / 2;

			if (this.count % 2 === 0) {
				if (this.framesToDark === 0) {
					this.framesToDark = Math.round(2 + Math.random() * 8);
					this.count = 0;
					this.darkFlashStartTime = null;
				}
				this.framesToDark--;
				if (this.framesToDark === 1) {
					ctx.fillStyle = "#777";
					this.darkFlashStartTime = performance.now();
				} else {
					ctx.fillStyle = "#aaa";
				}
			} else {
				ctx.fillStyle = "#fff";
			}
			ctx.fillRect(x, y, squareSize, squareSize);
		},
		handleClick() {
			const reaction = this.darkFlashStartTime ? performance.now() - this.darkFlashStartTime : 800;
			this.results.push(reaction);
			if (this.results.length > this.countAverage) this.results.shift();
			this.darkFlash = false;
			this.darkFlashStartTime = null;
		},
	},
};
</script>

<style scoped>
canvas {
	touch-action: manipulation;
}
</style>
