<template>
	<v-app>
		<v-app-bar app color="primary" dark class="app-bar-no-padding">
			<img :src="trainImage" alt="Logo" class="logo-img" />

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

<style scoped>
.app-bar-no-padding {
	padding: 0 !important;
}

/* Use deep selector to reach internal Vuetify class */
.app-bar-no-padding /deep/ .v-toolbar__content {
	padding: 0 !important;
}

/* Ensures the img is flush and full-height */
.logo-img {
	height: 64px;
	/* or match your toolbar's exact height (e.g. 56px or 64px) */
	width: auto;
	margin: 0;
	padding: 0;
	display: block;
	/* eliminate inline spacing */
}
</style>
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
