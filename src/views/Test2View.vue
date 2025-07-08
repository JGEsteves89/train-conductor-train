<template>
	<v-container>
		<h1>TEA-Occ paper test</h1>
		<p>ATTENTION TESTS</p>
		<h3>What format will the test take?</h3>
		<p>The test consists of three parts. The first part involves listening to an audio recording
			where you have to count certain tones while ignoring the distracting tone of a different
			pitch. The second part involves searching a telephone directory page for specific
			information. The third part is another search of a telephone directory but this time, you
			are required to multi-task and listen to tones on an audio recording at the same time.
			There are instructions before each test starts so you understand what you are being
			asked to so. The test will take approximately 25 minutes to complete.</p>
		<p>Isto é o que aparece no PDF mas depois o exemplo que dá é diferente. Os sons foram exemplos que encontrei na net eram sobre contar os tons altos e
			baixos.</p>
		<p>No outro teste, tens de encontrar e clicar nos "K"s.</p>
		<p>Nota: não dá para saber se um tom é alto ou baixo sem comparar com outro. Por isso, tenta decorar os
			primeiros sons e, a partir daí, vais decidindo se descartas ou não, consoante o que for. </p>
		<v-btn block color="primary" class="mb-4" @click="$router.push('/test2/start/0')">
			Start
		</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "Test2View",
};
</script>