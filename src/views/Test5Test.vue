<template>
	<v-container>
		<v-row justify="center" dense cols="4">
			<ColorChangeReaction :canvas-size="320" />
		</v-row>
	</v-container>
</template>

<script>
import ColorChangeReaction from "@/components/ColorChangeReaction.vue";

export default {
	name: "Test5Test",
	components: {
		ColorChangeReaction,
	},
	data() {
		return { };
	},
};
</script>
