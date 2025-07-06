<template>
	<v-container>
		<h1>Group Bourdon paper test</h1>
		<p>ATTENTION TESTS</p>
		<h3>What format will the test take?</h3>
		<p>You will complete this test in paper and pencil format, and you need to work through
			a block of differently grouped dots. Working from left to right you will need to work
			through each page line after line, putting a mark through the groups of 4 dots.
			The test will be in five parts and the Test Administrator will tell you when to start and
			also when to stop each part by saying "change". When you hear this, you will need to
			stop at the part you are on and go straight to the next part. Remember both accuracy
			and speed are important – you will be penalised for making errors.</p>
		<h3>Example</h3>
		<p>For the attention tests we have designed a practice test which will help you to practice
			the sort of tasks you will be asked to complete as part of the assessment centre. The
			content of this practice test is a little different from the real tests on the day, but it does
			tap into the same ability to concentrate. In the practice test you are presented with
			rows of letters. You have to work through the test from left to right and from top to
			bottom in the same way as reading English text, putting a stroke through a particular
			letter when you see it. For the example below, the letter you should be looking for and
			striking through is D. All other letters should be ignored. If you make a mistake, you
			can correct it by making the stroke into a cross (X). Try with the two lines of letters
			below. Make a strike like this /.</p>
		<p>In the first line you should have crossed out 4 ‘D’s and in the second line you should
			have crossed out 3 ‘D’s</p>
		<v-btn block color="primary" class="mb-4" @click="$router.push('/test1/start/0')">
			Start
		</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "Test1View",
};
</script>