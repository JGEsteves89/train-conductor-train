import Vue from "vue";
import Router from "vue-router";

import HomeView from "@/views/HomeView.vue";
import Test1View from "@/views/Test1View.vue";
import Test1Test from "@/views/Test1Test.vue";
import Test2View from "@/views/Test2View.vue";
import Test2Test from "@/views/Test2Test.vue";
import Test3View from "@/views/Test3View.vue";

Vue.use(Router);

export default new Router({
	mode: "hash", // important for static sites on GitHub Pages
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "Home",
			component: HomeView,
		},
		{
			path: "/test1",
			name: "Test1",
			component: Test1View,
		},
		{
			path: '/test1/start/:index?',
			name: 'Test1Test',
			component: Test1Test,
			props: true
		},
		{
			path: "/test2",
			name: "Test2",
			component: Test2View,
		},
		{
			path: '/test2/start/:index?',
			name: 'Test2Test',
			component: Test2Test,
			props: true
		},
		{
			path: "/test3",
			name: "Test3",
			component: Test3View,
		},
	],
});
