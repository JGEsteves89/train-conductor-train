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

		<v-footer app color="grey lighten-4">
			<v-container class="text-center">
				<small>
					Contact: <a href="mailto:ijimiguel@gmail.com">ijimiguel@gmail.com</a>
					&nbsp;|&nbsp; Version: {{ version }}
				</small>
			</v-container>
		</v-footer>
	</v-app>
</template>

<script>
// Import version from package.json (only works if Vue CLI with webpack)
import pkg from "../package.json";

export default {
	name: "App",
	data: () => ({
		version: pkg.version,
	}),
	computed: {
		trainImage() {
			return process.env.BASE_URL + "images/train.png";
		},
	},
};
</script>

<style scoped>
.app-bar-no-padding {
	padding: 0 !important;
}

.app-bar-no-padding /deep/ .v-toolbar__content {
	padding: 0 !important;
}

.logo-img {
	height: 64px;
	width: auto;
	margin: 0;
	padding: 0;
	display: block;
}
</style>
