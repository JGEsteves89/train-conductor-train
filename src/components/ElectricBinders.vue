<template>
	<v-container class="d-flex justify-center align-center" style="height: 100px;">
		<div class="strength-bars">
			<div v-for="bar in bars" :key="bar.level" class="strength-bar" :class="{ active: value >= bar.level }"
				:style="{ height: bar.height + 'px' }"></div>
		</div>
	</v-container>
</template>

<script>
export default {
	name: 'ElectricBinders',
	props: {
		value: {
			type: Number,
			required: true,
			validator: v => v >= 0 && v <= 4,
		},
	},
	data() {
		return {
			bars: [
				{ level: 1, height: 20 },
				{ level: 2, height: 30 },
				{ level: 3, height: 40 },
				{ level: 4, height: 50 },
			],
		};
	},
};
</script>

<style scoped>
.strength-bars {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	gap: 6px;
	height: 60px;
}

.strength-bar {
	width: 12px;
	background-color: #ccc;
	border-radius: 2px;
	transition: background-color 0.3s;
}

.strength-bar.active {
	background-color: #42a5f5;
}
</style>
