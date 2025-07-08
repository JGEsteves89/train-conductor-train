import Vue from "vue";
import Router from "vue-router";

import HomeView from "@/views/HomeView.vue";
import Test1View from "@/views/Test1View.vue";
import Test1Test from "@/views/Test1Test.vue";
import Test2View from "@/views/Test2View.vue";
import Test2Test from "@/views/Test2Test.vue";
import Test3View from "@/views/Test3View.vue";
import Test3Test from "@/views/Test3Test.vue";

Vue.use(Router);

export default new Router({
	mode: "hash", // important for static sites on GitHub Pages
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "HomeView",
			component: HomeView,
		},
		{
			path: "/test1",
			name: "Test1View",
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
			name: "Test2View",
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
			name: "Test3View",
			component: Test3View,
		},
		{
			path: '/test3/start/:index?',
			name: 'Test3Test',
			component: Test3Test,
			props: true
		},
	],
});
