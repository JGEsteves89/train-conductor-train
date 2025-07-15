<template>
	<v-container>
		<div>Vector: {{ vector }}</div>
		<v-row justify="center" dense cols="4">
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

export default {
	name: "Test7Test",
	components: { Joystick, TrackPath },
	data() {
		return {
			vector: { x: 0, y: 0 },
		};
	},
	computed: {
		currentPath() {
			return [
				{ x: 0.1, y: 0.5 },
				{ x: 0.5, y: 0.5 },
				{ x: 0.8, y: 0.2 }
			]
		},
	},
	methods: {
		onJoystickMoveVertically(vec) {
			this.vector.y = vec.y;
		},
		onJoystickMoveHorizontally(vec) {
			this.vector.x = vec.x;
		},
	},
};
</script>
