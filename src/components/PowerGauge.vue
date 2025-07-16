<template>
	<div class="gauge-container">
		<svg viewBox="0 0 200 100" class="gauge">
			<!-- Arc -->
			<path d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="#ccc" stroke-width="20" />
			<!-- Needle -->
			<line :x1="100" :y1="100" :x2="needleX" :y2="needleY" stroke="#f44336" stroke-width="4" />
			<!-- Labels -->
			<text x="20" y="95" font-size="12" text-anchor="middle">Low</text>
			<text x="100" y="40" font-size="12" text-anchor="middle">Medium</text>
			<text x="180" y="95" font-size="12" text-anchor="middle">High</text>
		</svg>
	</div>
</template>

<script>
export default {
	name: 'PowerGauge',
	props: {
		level: {
			type: String,
			required: true
		}
	},
	computed: {
		angle() {
			switch (this.level) {
				case 'low':
					return this.randomBetween(-170, -150);
				case 'medium':
					return this.randomBetween(-110, -80);
				case 'high':
					return this.randomBetween(-30, -5);
				default:
					return 0
			}
		},
		needleX() {
			const rad = (this.angle * Math.PI) / 180
			return 100 + 70 * Math.cos(rad);
		},
		needleY() {
			const rad = (this.angle * Math.PI) / 180
			return 100 + 70 * Math.sin(rad);
		}
	},
	methods: {
		randomBetween(min, max) {
			return Math.round(Math.random() * (max - min) + min);
		}
	},
}
</script>

<style scoped>
.gauge-container {
	width: 100%;
	max-width: 200px;
	margin: auto;
}

.gauge {
	width: 100%;
	height: auto;
	display: block;
}
</style>
