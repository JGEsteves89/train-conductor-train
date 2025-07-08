const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	publicPath: process.env.NODE_ENV === 'production'
		? '/train-conductor-train/'
		: '/',
	transpileDependencies: ["vuetify"],
	lintOnSave: false,
});
