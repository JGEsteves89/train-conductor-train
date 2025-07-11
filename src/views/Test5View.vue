<template>
	<v-container>
		<h1>The WAFV vigilance test</h1>
		<p>COMPUTERISED TESTS</p>
		<h3>Instructions</h3>
		<p>During this test you will be asked to look at a white screen, in the middle of the white
			screen there will be a grey square that is constantly flashing (i.e., quickly appearing
			then disappearing). Throughout the test time this square will occasionally get darker
			in colour. When this happens, you have to press the green button on the keyboard
			as quickly as possible. This is a test of your vigilance and reaction speed. You need
			to respond as quickly and accurately as possible as you will be penalised for errors.
			On the day of the test, you will have to do this for approximately 30 minutes.</p>

		<v-btn block color="primary" class="mb-4" @click="$router.push('/test5/start/0')">
			Start
		</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "Test5View",
};
</script>