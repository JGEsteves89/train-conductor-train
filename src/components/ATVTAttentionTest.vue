<template>
	<div>
		<v-card flat>
			<v-card-text class="text-center">
				<div v-if="showImage">
					<img :src="'atavtImages/' + image" alt="Test Image" style="max-width: 100%; height: auto;" />
				</div>

				<div v-else>
					<div v-for="option in allOptions" :key="option.key">
						<v-checkbox v-model="userSelections"
							:label="(checked ? getOptionColor(option.key) : '') + option.label" :value="option.key"
							:disabled="checked" />

					</div>

					<v-btn v-if="!checked" color="primary" @click="checkAnswers">Check</v-btn>
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>

<style></style>

<script>
export default {
	name: "ATVTAttentionTest",
	props: {
		image: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			detected: {
				P: false,
				M: false,
				B: false,
				S: false,
				T: false,
			},
			showImage: true,
			userSelections: [],
			checked: false,
			allOptions: [
				{ key: "P", label: "Pedestrians" },
				{ key: "M", label: "Motor vehicles" },
				{ key: "B", label: "Bikes, motorcycles, or scooters/mopeds" },
				{ key: "S", label: "Road signs" },
				{ key: "T", label: "Traffic lights" },
			],
			timer: null,
		};
	},
	mounted() {
		this.reset();
	},
	methods: {
		reset() {
			// Reset state
			this.userSelections = [];
			this.checked = false;
			this.showImage = true;

			// Clear any previous timer
			if (this.timer) {
				clearTimeout(this.timer);
			}

			// Parse image
			this.processImageName();

			// Set timer to hide image after 1.5s
			this.timer = setTimeout(() => {
				this.showImage = false;
			}, 1500);
		},

		processImageName() {
			const name = this.image.split(".")[0].toUpperCase();
			for (let key of Object.keys(this.detected)) {
				this.detected[key] = name.includes(key);
			}
		},

		checkAnswers() {
			this.checked = true;
		},

		getOptionColor(key) {

			const correct = this.detected[key];
			const selected = this.userSelections.includes(key);

			if (correct && selected) return "✅";
			if (correct && !selected) return "⚠️";
			if (!correct && selected) return "❌";

			return "";
		},
	},
	watch: {
		image: {
			immediate: true,
			handler() {
				this.reset();
			},
		},
	},
	beforeDestroy() {
		clearTimeout(this.timer);
	},
};
</script>
