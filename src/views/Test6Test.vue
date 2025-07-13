<template>
	<v-container>
		<v-row justify="center" dense cols="4">
			<ATVTAttentionTest ref="attentionTest" :image="this.currentTest" />
		</v-row>
		<!-- button -->
		<v-btn block color="primary" class="mb-4" @click="goToTest(testIndex + 1)">
			New Test
		</v-btn>
	</v-container>
</template>

<script>

const TESTS = [
	"1-PMBS.png",
	"10-.png",
	"11-M.png",
	"12-MT.png",
	"13-PM.png",
	"14-PB.png",
	"15-PMS.png",
	"16-PMBST.png",
	"17-.png",
	"18-PT.png",
	"19-PMBT.png",
	"2-MB.png",
	"20-MBST.png",
	"21-PMBST.png",
	"22-PMB.png",
	"23-PMS.png",
	"24-MT.png",
	"25-PM.png",
	"26-PMBS.png",
	"27-PMS.png",
	"28-MB.png",
	"29-PMBS.png",
	"3-PS.png",
	"30-MBST.png",
	"31-PBS.png",
	"32-PS.png",
	"33-PMST.png",
	"34-M.png",
	"35-PMBST.png",
	"36-B.png",
	"37-MB.png",
	"38-PMBST.png",
	"39-.png",
	"4-PMBST.png",
	"40-PB.png",
	"5-PBS.png",
	"6-MS.png",
	"7-PS.png",
	"8-PM.png",
	"9-PMBST.png"
]
import ATVTAttentionTest from "@/components/ATVTAttentionTest.vue";

export default {
	name: "Test6Test",
	components: {
		ATVTAttentionTest,
	},
	props: {
		index: { type: String, default: 0 }
	},
	data() {
		return {};
	},
	computed: {
		testIndex() {
			let idx = parseInt(this.index, 10);
			return isNaN(idx) ? 0 : idx;
		},

		currentTest() {
			if (this.testIndex < 0 || this.testIndex >= TESTS.length) {
				this.$router.push("/test6/");
				return null;
			}
			return TESTS[this.testIndex];
		},
	},
	watch: {
		testIndex(newIndex) {
			if (newIndex < 0 || newIndex >= TESTS.length) {
				this.goToTest(0);
			}
			this.$refs.attentionTest.reset();
		}
	},
	mounted() {
		if (this.testIndex < 0 || this.testIndex >= TESTS.length) {
			this.$router.push("/test6/");
			return;
		}
		window.scrollTo({ top: 0, behavior: "smooth" });
	},
	methods: {
		goToTest(index) {
			this.$router.push({ name: "Test6Test", params: { index: index.toString() } });
		},
	}
}
</script>
