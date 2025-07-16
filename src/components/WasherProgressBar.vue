<template>
	<v-container>
		<div class="washer-progress-alt">
			<v-progress-linear :value="washerFillPercent" height="16" color="primary" rounded
				background-color="grey lighten-2"></v-progress-linear>

			<div class="washer-labels">
				<div v-for="mark in marks" :key="mark" class="washer-label" :style="{ left: (mark / max) * 100 + '%' }">
					{{ mark }}
				</div>
			</div>
		</div>
	</v-container>
</template>

<script>
export default {
	name: 'WasherProgressBarAlt',
	props: {
		value: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			marks: [1, 5, 10, 15, 20, 25],
			max: 25,
		};
	},
	computed: {
		washerFillPercent() {
			return Math.min((this.value / this.max) * 100, 100);
		},
	},
};
</script>

<style scoped>
.washer-progress-alt {
	position: relative;
	padding-bottom: 24px;
	/* Space for labels */
}

.washer-labels {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	height: 16px;
}

.washer-label {
	position: absolute;
	transform: translateX(-50%);
	font-size: 11px;
	color: #555;
}
</style>
