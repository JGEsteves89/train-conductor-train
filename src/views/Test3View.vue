<template>
	<v-container>
		<h1>Trainability for rules and procedures test 1b</h1>
		<p>TRP1b</p>
		<h3>What format will the test take?</h3>
		<p>For this test you will listen to some instructions being read aloud on an audio recording. Whilst they are
			being read aloud you will also be given a printed copy of the instructions.
			You will then have the chance to study and learn the information. You can make notes on scrap paper
			provided. However, both your notes and the printed copy of the instructions will be collected before you are
			asked to answer some questions.
			After studying the passage you will be asked to answer 18 multiple-choice questions based on the information
			contained within it. For each question you will have four possible answers and you must select the one which
			is correct. You will have 7 minutes to answer the 18 questions.</p>
		<v-btn block color="primary" class="mb-4" @click="$router.push('/test3/start/0')">
			Start
		</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "Test3View",
};
</script>