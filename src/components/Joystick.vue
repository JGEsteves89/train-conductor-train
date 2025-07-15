<template>
	<div class="joystick-container" v-hammer:panstart="onStart" v-hammer:panend="onEnd" v-hammer:pan="onMove">
		<svg class="joystick-visual" viewBox="0 0 120 120">
			<circle cx="60" cy="60" :r="radius" stroke="#999" stroke-width="2" fill="none" />
			<circle :cx="60 + delta.x" :cy="60 + delta.y" r="20" fill="#1976D2" />
		</svg>
	</div>
</template>

<script>
export default {
	name: 'Joystick',
	data() {
		return {
			radius: 50,
			delta: { x: 0, y: 0 },
			active: false,
			activeTouchId: null,
		};
	},
	methods: {
		onStart(e) {
			this.active = true;
		},
		onMove(e) {
			if (!this.active) return;
			const rect = this.$el.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const dx = e.center.x - centerX;
			const dy = e.center.y - centerY;

			const clampedX = Math.max(-this.radius, Math.min(dx, this.radius));
			const clampedY = Math.max(-this.radius, Math.min(dy, this.radius));

			this.delta = { x: clampedX, y: clampedY };

			this.$emit('input', {
				x: clampedX / this.radius,
				y: clampedY / this.radius,
			});
		},
		onEnd() {
			this.delta = { x: 0, y: 0 };
			this.active = false;
			this.$emit('input', { x: 0, y: 0 });
		},
	}
};
</script>

<style scoped>
.joystick-container {
	width: 150px;
	height: 150px;
	border: 2px dashed rgba(100, 100, 100, 0.5);
	position: relative;
	touch-action: none;
}

.joystick-visual {
	width: 100%;
	height: 100%;
	pointer-events: none;
}
</style>
