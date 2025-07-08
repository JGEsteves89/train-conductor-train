<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img alt="Train banner" class="shrink mt-1" contain min-width="100" :src="trainImage" width="100" />
			</div>

			<v-spacer></v-spacer>

			<v-btn @click="$router.push('/')" text>
				<span class="mr-2">Home</span>
			</v-btn>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: "App",

	data: () => ({
		//
	}),
	computed: {
		trainImage() {
			return process.env.BASE_URL + "images/train.png";
		},
	},
};
</script>
