<template>
	<v-container>
		<h1>The ATAVT Perception Test</h1>
		<p>COMPUTERISED TESTS</p>
		<h3>Instructions</h3>
		<pre style="white-space: pre-wrap; font-family: inherit; line-height: 1.5;">
		During this test you will be presented with a series of images on the computer screen. These images will be of European traffic scenes. In these images you may see the following:
			• pedestrians;
			• motor vehicles;
			• bikes, motorcycles, or scooters/mopeds;
			• road signs;
			• traffic lights.
		Each image will flash up on the screen very briefly. After the image has gone you have to indicate which of the 5 objects listed above you saw in that image. You do
		this by pressing the number that corresponds to the object. You will be told which object corresponds with which number during the instructions on the assessment day. In the images presented you may only see one of the objects, but you could see up to all 5 objects. It is your job to identify which of the objects you have seen in the image. On the day you will have a number of images to respond to. Try to respond as accurately as possible.
		</pre>

		<v-btn block color="primary" class="mb-4" @click="$router.push('/test6/start/0')">
			Start
		</v-btn>
	</v-container>
</template>
<script>
export default {
	name: "Test6View",
};
</script>