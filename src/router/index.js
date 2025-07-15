import Vue from "vue";
import Router from "vue-router";

import HomeView from "@/views/HomeView.vue";
import Test1View from "@/views/Test1View.vue";
import Test1Test from "@/views/Test1Test.vue";
import Test2View from "@/views/Test2View.vue";
import Test2Test from "@/views/Test2Test.vue";
import Test3View from "@/views/Test3View.vue";
import Test3Test from "@/views/Test3Test.vue";
import Test4View from "@/views/Test4View.vue";
import Test4Test from "@/views/Test4Test.vue";
import Test5View from "@/views/Test5View.vue";
import Test5Test from "@/views/Test5Test.vue";
import Test6View from "@/views/Test6View.vue";
import Test6Test from "@/views/Test6Test.vue";
import Test7View from "@/views/Test7View.vue";
import Test7Test from "@/views/Test7Test.vue";

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
		{
			path: "/test4",
			name: "Test4View",
			component: Test4View,
		},
		{
			path: '/test4/start/:index?',
			name: 'Test4Test',
			component: Test4Test,
			props: true
		},
		{
			path: "/test5",
			name: "Test5View",
			component: Test5View,
		},
		{
			path: '/test5/start/:index?',
			name: 'Test5Test',
			component: Test5Test,
			props: true
		},
		{
			path: "/test6",
			name: "Test6View",
			component: Test6View,
		},
		{
			path: '/test6/start/:index?',
			name: 'Test6Test',
			component: Test6Test,
			props: true
		},
				{
			path: "/test7",
			name: "Test7View",
			component: Test7View,
		},
		{
			path: '/test7/start/:index?',
			name: 'Test7Test',
			component: Test7Test,
			props: true
		},
	],
});
