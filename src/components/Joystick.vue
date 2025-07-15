<template>
	<div class="joystick-container" @mousedown="onTouchStart" @mouseup="onTouchEnd" @mousemove="onTouchMove"
		@touchstart="onTouchStart" @touchend="onTouchEnd" @touchmove="onTouchMove">
		<svg class="joystick-visual" viewBox="0 0 120 120">
			<!-- Outer stroke circle to show bounds -->
			<circle cx="60" cy="60" :r="radius" stroke="#999" stroke-width="2" fill="none" />
			<!-- Inner filled joystick -->
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
		onTouchStart(e) {
			if (this.active) return;

			e.preventDefault();
			const touch = e.changedTouches[0];
			this.activeTouchId = touch.identifier;
			this.active = true;
			console.log('onTouchStart', this.delta);
		},
		onTouchMove(e) {
			if (!this.active) return;
			const touch = Array.from(e.changedTouches).find(t => t.identifier === this.activeTouchId);
			if (!touch) return;


			const rect = this.$el.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const dx = touch.clientX - centerX;
			const dy = touch.clientY - centerY;

			const clampedX = Math.max(-this.radius, Math.min(dx, this.radius));
			const clampedY = Math.max(-this.radius, Math.min(dy, this.radius));

			this.delta = { x: clampedX, y: clampedY };

			this.$emit('input', {
				x: clampedX / this.radius,
				y: clampedY / this.radius,
			});
			console.log('onTouchMove', this.delta)
		},
		onTouchEnd(e) {
			const ended = Array.from(e.changedTouches).some(t => t.identifier === this.activeTouchId);
			if (!ended) return;

			this.delta = { x: 0, y: 0 };
			this.active = false;
			this.activeTouchId = null;
			this.$emit('input', { x: 0, y: 0 });
			console.log('onTouchEnd', this.delta)
		},
	},
	mounted() {
		console.log('mounted', this.delta)
	},

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
