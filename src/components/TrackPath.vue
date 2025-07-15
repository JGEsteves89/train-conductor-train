<template>
	<canvas ref="canvas" class="track-canvas" />
</template>

<script>
export default {
	name: 'TrackPath',
	props: {
		path: {
			type: Array,
			required: true,
		},
		input: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			position: { x: this.path[0].x, y: this.path[0].y }, // Start at first point of path
			speed: 0.002, // Tweak to control speed of movement
			animationFrame: null,
		};
	},
	mounted() {
		this.resizeCanvas();
		window.addEventListener('resize', this.resizeCanvas);
		this.startAnimation();
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeCanvas);
		cancelAnimationFrame(this.animationFrame);
	},
	methods: {
		resizeCanvas() {
			const canvas = this.$refs.canvas;
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		},
		startAnimation() {
			const update = () => {
				this.updatePosition();
				this.draw();
				this.animationFrame = requestAnimationFrame(update);
			};
			update();
		},
		updatePosition() {
			this.position.x += this.input.x * this.speed;
			this.position.y += this.input.y * this.speed;

			// Clamp to [0,1]
			this.position.x = Math.max(0, Math.min(1, this.position.x));
			this.position.y = Math.max(0, Math.min(1, this.position.y));
		},
		draw() {
			const canvas = this.$refs.canvas;
			const ctx = canvas.getContext('2d');
			const w = canvas.width;
			const h = canvas.height;

			ctx.clearRect(0, 0, w, h);

			// Draw path

			ctx.beginPath();
			ctx.strokeStyle = '#ccc';
			ctx.lineWidth = 4;
			ctx.moveTo(this.path[0].x * w, this.path[0].y * h);
			for (let i = 1; i < this.path.length; i++) {
				ctx.lineTo(this.path[i].x * w, this.path[i].y * h);
			}
			ctx.stroke();


			// Draw ball
			ctx.beginPath();
			ctx.fillStyle = '#1976D2';
			ctx.arc(this.position.x * w, this.position.y * h, 10, 0, Math.PI * 2);
			ctx.fill();
		},
	}
};
</script>

<style scoped>
.track-canvas {
	width: 100%;
	height: 300px;
	border: 2px solid #aaa;
	background-color: #fdfdfd;
	border-radius: 10px;
}
</style>
