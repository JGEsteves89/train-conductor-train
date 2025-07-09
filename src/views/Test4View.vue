<template>
	<v-container>
		<h1>Trainability for rules and procedures test 2</h1>
		<p>TRP2</p>
		<h3>Instructions</h3>
		<p>You will have to decide the order in which the panels must be
		checked. If the arrow on a panel has this background <span
		style="display:inline-block; width:1em; height:1em;
		background-color:lightgray;"></span> then this panel should be checked
		first. If the arrow on the panel has this background <span
		style="display:inline-block; width:1em; height:1em;
		background-color:black;"></span> then it should be checked second. If the
		arrow on the panel has this background <span
		style="display:inline-block; width:1em; height:1em;
		background-color:gray;"></span> then it should be checked last. You
		must then choose which of the multiple- choice answers; either A, B, C
		or D matches the order that you think that the panels must be checked.
		You put your answers on the practice TRP part 2 answer sheet by shading
		in either A, B, C or D. You will find the answer sheet on page 41 of
		this document.</p>
		<v-btn block color="primary" class="mb-4" @click="$router.push('/test4/start/0')">
			Start
		</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "Test4View",
};
</script>