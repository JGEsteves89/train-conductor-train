<template>
	<canvas ref="canvas" class="track-canvas" width="400" height="300" />
</template>
<style scoped>
.track-canvas {
	width: 100%;
	/* Expand to fill container */
	height: auto;
	/* Maintain aspect ratio */
	display: block;
	image-rendering: pixelated;
	/* Optional: keeps lines sharp when scaled */
}
</style>
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
	watch: {
		path: {
			handler(newPath) {
				if (newPath && newPath.length > 0) {
					this.position = { x: newPath[0].x, y: newPath[0].y };
				}
			},
			immediate: true, // Also applies on first render
			deep: true
		}
	},
	methods: {
		resizeCanvas() {
			// const canvas = this.$refs.canvas;
			// canvas.width = canvas.offsetWidth;
			// canvas.height = canvas.offsetHeight;
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
			const canvas = this.$refs.canvas;
			const w = 400;
			const h = 300;

			this.position.x += this.input.x * (h / w) * this.speed;
			this.position.y += this.input.y * this.speed;

			// Clamp to [0,1]
			this.position.x = Math.max(0, Math.min(1, this.position.x));
			this.position.y = Math.max(0, Math.min(1, this.position.y));
		},
		draw() {
			const canvas = this.$refs.canvas;
			const ctx = canvas.getContext('2d');
			const w = 400;
			const h = 300;

			ctx.clearRect(0, 0, w, h);

			// Draw path
			let currentX = 0;
			let currentY = 0;
			ctx.strokeStyle = '#ccc';

			ctx.beginPath();
			ctx.lineWidth = 14;

			for (let cmd of this.path) {
				const x = cmd.x * w;
				const y = cmd.y * h;

				if (cmd.c === 'move') {
					ctx.moveTo(x, y);
					currentX = x;
					currentY = y;
				}

				else if (cmd.c === 'line') {
					ctx.lineTo(x, y);
					currentX = x;
					currentY = y;
				}

				else if (cmd.c === 'arc') {
					const endX = cmd.ex * w;
					const endY = cmd.ey * h;
					drawArcThroughThreePoints(ctx,
						{ x: currentX, y: currentY },
						{ x: x, y: y },
						{ x: endX, y: endY });

					currentX = endX;
					currentY = endY;
				}
			}
			ctx.stroke();


			// Draw ball
			ctx.beginPath();
			const dist = minDistanceToPath(this.path, this.position, w, h);
			ctx.fillStyle = '#1976D2';
			if (dist > 8) {
				ctx.fillStyle = '#ff3575';
			}
			ctx.arc(this.position.x * w, this.position.y * h, 10, 0, Math.PI * 2);
			ctx.fill();
		},
	}
};

function drawArcThroughThreePoints(ctx, p1, p2, p3, n = 0) {
	// Helper to find the perpendicular bisector of two points
	function perpendicularBisector(pA, pB) {
		const mid = {
			x: (pA.x + pB.x) / 2,
			y: (pA.y + pB.y) / 2
		};
		const dx = pB.x - pA.x;
		const dy = pB.y - pA.y;
		return {
			point: mid,
			slope: -dx / dy
		};
	}

	// Helper to find intersection point of two lines
	function intersection(b1, b2) {
		const x1 = b1.point.x, y1 = b1.point.y, m1 = b1.slope;
		const x2 = b2.point.x, y2 = b2.point.y, m2 = b2.slope;

		const x = (m1 * x1 - m2 * x2 + y2 - y1) / (m1 - m2);
		const y = m1 * (x - x1) + y1;
		return { x, y };
	}

	// Find center of the circle through the 3 points
	const bisector1 = perpendicularBisector(p1, p2);
	const bisector2 = perpendicularBisector(p2, p3);
	const center = intersection(bisector1, bisector2);

	// Calculate radius and angles
	const radius = Math.hypot(p1.x - center.x, p1.y - center.y);
	const angle1 = Math.atan2(p1.y - center.y, p1.x - center.x);
	const angle2 = Math.atan2(p2.y - center.y, p2.x - center.x);
	const angle3 = Math.atan2(p3.y - center.y, p3.x - center.x);

	// Determine if arc should be drawn clockwise or not
	const cross = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
	const anticlockwise = cross < 0;

	if (n === 0) {
		ctx.arc(center.x, center.y, radius, angle1, angle3, anticlockwise);
	}
	else {

		let startAngle = angle1;
		let endAngle = angle3;

		// Normalize angles for consistent stepping
		if (anticlockwise && endAngle > startAngle) {
			endAngle -= 2 * Math.PI;
		} else if (!anticlockwise && endAngle < startAngle) {
			endAngle += 2 * Math.PI;
		}

		const points = [];
		for (let i = 0; i <= n; i++) {
			const t = i / n;
			const angle = startAngle + (endAngle - startAngle) * t;
			points.push({
				x: center.x + radius * Math.cos(angle),
				y: center.y + radius * Math.sin(angle)
			});
		}
		return points;
	}
}


function distanceToSegment(p, v, w) {
	// p = point, v = start, w = end
	const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
	if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y); // v == w
	let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
	t = Math.max(0, Math.min(1, t));
	const proj = {
		x: v.x + t * (w.x - v.x),
		y: v.y + t * (w.y - v.y)
	};
	return Math.hypot(p.x - proj.x, p.y - proj.y);
}

function minDistanceToPath(pathCommands, point, width, height) {
	const p = { x: point.x * width, y: point.y * height };
	let minDist = Infinity;

	let current = { x: 0, y: 0 };

	for (const cmd of pathCommands) {
		const next = { x: cmd.x * width, y: cmd.y * height };

		if (cmd.c === 'move') {
			current = next;
		}

		else if (cmd.c === 'line') {
			const dist = distanceToSegment(p, current, next);
			if (dist < minDist) minDist = dist;
			current = next;
		}

		else if (cmd.c === 'arc') {
			const end = { x: cmd.ex * width, y: cmd.ey * height };
			const arcPoints = drawArcThroughThreePoints(null, current, next, end, 20);

			for (let i = 0; i < arcPoints.length - 1; i++) {
				const dist = distanceToSegment(p, arcPoints[i], arcPoints[i + 1]);
				if (dist < minDist) minDist = dist;
			}

			current = end;
		}
	}

	return minDist;
}
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
