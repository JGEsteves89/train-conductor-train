<template>
	<v-container>
		<div>Test: {{ testIndex + 1 }}</div>
		<v-row justify="center" dense cols="4" style="width: 100%; max-width: 800px; margin: 0 auto;">
			<TrackPath :path="currentPath" :input="vector" />
		</v-row>
		<v-row justify="center" dense cols="4">
			<div
				style="display: flex; justify-content: space-between; position: fixed; bottom: 20px; width: 100%; padding: 0 20px;">
				<Joystick :pos="-1" @input="onJoystickMoveHorizontally" />
				<Joystick :pos="1" @input="onJoystickMoveVertically" />
			</div>
		</v-row>
		<!-- button -->
		<v-btn block color="primary" class="mb-4" @click="goToTest(testIndex + 1)">
			New Test
		</v-btn>
	</v-container>
</template>

<script>
import Joystick from "@/components/Joystick.vue";
import TrackPath from "@/components/TrackPath.vue";

const TESTS = [
	[
		{ c: 'move', x: 376 / 400, y: 72 / 282 },
		{ c: 'line', x: 321 / 400, y: 250 / 282 },
		{ c: 'line', x: 293 / 400, y: 86 / 282 },
		{ c: 'line', x: 155 / 400, y: 86 / 282 },
		{ c: 'line', x: 155 / 400, y: 235 / 282 },
		{ c: 'arc', x: 89 / 400, y: 231 / 282, ex: 43 / 400, ey: 193 / 282 },
		{ c: 'arc', x: 41 / 400, y: 128 / 282, ex: 82 / 400, ey: 74 / 282 },
	],
	[
		{ c: 'move', x: 311 / 364, y: 198 / 230 },
		{ c: 'arc', x: 339 / 364, y: 150 / 230, ex: 340 / 364, ey: 93 / 230 },
		{ c: 'arc', x: 279 / 364, y: 32 / 230, ex: 247 / 364, ey: 26 / 230 },
		{ c: 'line', x: 247 / 364, y: 192 / 230 },
		{ c: 'line', x: 111 / 364, y: 192 / 230 },
		{ c: 'line', x: 80 / 364, y: 30 / 230 },
		{ c: 'line', x: 27 / 364, y: 192 / 230 },
	],
	[
		{ c: 'move', x: 186 / 301, y: 39 / 264 },
		{ c: 'arc', x: 275 / 301, y: 72 / 264, ex: 255 / 301, ey: 171 / 264 },
		{ c: 'line', x: 201 / 301, y: 216 / 264 },
		{ c: 'line', x: 112 / 301, y: 59 / 264 },
		{ c: 'line', x: 20 / 301, y: 232 / 264 },
		{ c: 'line', x: 20 / 301, y: 31 / 264 },
	],
	[
		{ c: 'move', x: 277 / 314, y: 235 / 259 },
		{ c: 'line', x: 277 / 314, y: 30 / 259 },
		{ c: 'line', x: 188 / 314, y: 201 / 259 },
		{ c: 'line', x: 100 / 314, y: 53 / 259 },
		{ c: 'arc', x: 27 / 314, y: 184 / 259, ex: 114 / 314, ey: 223 / 259 }
	],
	[
		{ c: 'move', x: 82 / 412, y: 74 / 282 },
		{ c: 'arc', x: 41 / 412, y: 128 / 282, ex: 155 / 412, ey: 235 / 282 },
		{ c: 'line', x: 155 / 412, y: 86 / 282 },
		{ c: 'line', x: 293 / 412, y: 86 / 282 },
		{ c: 'line', x: 321 / 412, y: 250 / 282 },
		{ c: 'line', x: 376 / 412, y: 72 / 282 },
	],
	[
		{ c: 'move', x: 27 / 364, y: 192 / 230 },
		{ c: 'line', x: 80 / 364, y: 30 / 230 },
		{ c: 'line', x: 111 / 364, y: 192 / 230 },
		{ c: 'line', x: 247 / 364, y: 192 / 230 },
		{ c: 'line', x: 247 / 364, y: 30 / 230 },
		{ c: 'arc', x: 340 / 364, y: 93 / 230, ex: 311 / 364, ey: 198 / 230 },
	],
	[
		{ c: 'move', x: 20 / 301, y: 31 / 264 },
		{ c: 'line', x: 20 / 301, y: 232 / 264 },
		{ c: 'line', x: 112 / 301, y: 59 / 264 },
		{ c: 'line', x: 201 / 301, y: 216 / 264 },
		{ c: 'line', x: 255 / 301, y: 171 / 264 },
		{ c: 'arc', x: 275 / 301, y: 72 / 264, ex: 186 / 301, ey: 39 / 264 },
	],
	[
		{ c: 'move', x: 114 / 314, y: 223 / 259 },
		{ c: 'arc', x: 27 / 314, y: 184 / 259, ex: 100 / 314, ey: 53 / 259 },
		{ c: 'line', x: 188 / 314, y: 201 / 259 },
		{ c: 'line', x: 277 / 314, y: 30 / 259 },
		{ c: 'line', x: 277 / 314, y: 235 / 259 },
	],
]
export default {
	name: "Test7Test",
	components: { Joystick, TrackPath },
	props: {
		index: {
			type: String,
			default: '0',
		}
	},
	data() {
		return {
			vector: { x: 0, y: 0 },
		};
	},
	computed: {
		testIndex() {
			let idx = parseInt(this.index, 10);
			return isNaN(idx) ? 0 : idx;
		},
		currentPath() {
			if (this.testIndex < 0 || this.testIndex >= TESTS.length) {
				this.$router.push("/test7/");
				return null;
			}
			return TESTS[this.testIndex];
		},
	},
	watch: {
		testIndex(newIndex) {
			if (newIndex < 0 || newIndex >= TESTS.length) {
				this.$router.push("/test7/");
			}
		}
	},
	methods: {
		onJoystickMoveVertically(vec) {
			this.vector.y = vec.y;
		},
		onJoystickMoveHorizontally(vec) {
			this.vector.x = vec.x;
		},
		goToTest(index) {
			this.$router.push('/test7/')
			this.$router.replace({ name: 'Test7Test', params: { index: index.toString() } });
		}
	},
};
</script>
