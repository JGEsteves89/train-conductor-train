<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="6">
				<div class="text-sm font-semibold mb-1">Status</div>
				<div class="airport-display right-align">
					<div class="flip-char">{{ status }}</div>
				</div>
			</v-col>
			<v-col cols="12" md="6">
				<div class="text-sm font-semibold mb-1">Code</div>
				<div class="airport-display right-align">
					<div class="flip-char secondary">{{ code }}</div>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>


<script>
export default {
	name: 'WhipersModel',
	props: {
		status: {
			type: String,
			required: true
		},
		code: {
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
.airport-display {
	display: flex;
	flex-direction: column;
	gap: 8px;
	font-family: 'Courier New', monospace;
}

.right-align {
	align-items: flex-end;
	/* Align content to the right */
}

.flip-char {
	background: #1a1a1a;
	color: #33ff99;
	padding: 12px 20px;
	font-size: 24px;
	border-radius: 4px;
	box-shadow: inset 0 -2px 0 #0f0f0f, 0 2px 6px rgba(0, 0, 0, 0.5);
	letter-spacing: 2px;
	text-transform: uppercase;
	border: 1px solid #333;
	width: fit-content;
}

.flip-char.secondary {
	background: #0f0f0f;
	color: #00d2ff;
}
</style>
