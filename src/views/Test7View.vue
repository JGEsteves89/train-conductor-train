<template>
	<v-container>
		<h1>The 2Hand Co-ordination Test</h1>
		<p>COMPUTERISED TESTS</p>
		<h3>Instructions</h3>
		<p>The final part of the computerised safety tests is the hand co-ordination test. During
			this test you will be presented with a picture of a shape on the computer screen</p>
		<p>The joystick that you control with your left hand moves the ball left and right. The
			joystick that you control with your right hand moves the ball up and down. Before you
			start the test, you will get a chance to practice moving the ball around the shape
			twice.
			Once the test starts it is your job to move the ball around the shape. You will have to
			do this on the same shape 10 times. You must co-ordinate your left and right hand to
			move the ball around the shape as quickly and accurately as you can. Try your
			hardest to keep the ball within the lines of the shape at all times. If the ball moves
			outside of the lines, you will hear a buzzer go off through your headphones. If this
			happens you need to bring the ball back inside the lines as quickly as you can.</p>
		<v-btn block color="primary" class="mb-4" @click="$router.push('/test7/start/0')">
			Start
		</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "Test7View",
};
</script>