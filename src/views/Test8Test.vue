<template>
	<v-container>
		<v-row justify="center" dense cols="12" style="width: 100%; max-width: 800px; margin: 0 auto;">
			<DFFTTest ref="DFFTTest" />
		</v-row>
		<!-- button -->
		<v-btn block color="primary" class="mb-4" @click="generateTest">
			New Test
		</v-btn>
	</v-container>
</template>

<script>
import DFFTTest from "@/components/DFFTTest.vue";


export default {
	name: "Test8Test",
	components: { DFFTTest },
	props: {
		index: {
			type: String,
			default: '0',
		}
	},
	data() {
		return {

		};
	},
	computed: {

	},

	methods: {
		generateTest() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			this.$refs.DFFTTest.generateTest();
		}
	},
};
</script>
