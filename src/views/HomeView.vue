<template>
	<v-container class="pa-4" fluid>
		<v-row justify="center">
			<v-col cols="12" md="4">
				<v-btn block color="primary" class="mb-4" @click="$router.push('/test1')">
					ATTENTION TESTS: Group Bourdon test
				</v-btn>

				<v-btn block color="primary" class="mb-4" @click="$router.push('/test2')">
					ATTENTION TESTS: TEA-Occ test
				</v-btn>

				<v-btn block color="primary" class="mb-4" @click="$router.push('/test3')">
					MEMORY TESTS: TRP1b
				</v-btn>

				<v-btn block color="primary" class="mb-4" @click="$router.push('/test4')">
					MEMORY TESTS: TRP2
				</v-btn>

				<v-btn block color="primary" class="mb-4" @click="$router.push('/test5')">
					COMPUTERISED TESTS: The WAFV vigilance test
				</v-btn>

				<v-btn block color="primary" class="mb-4" @click="$router.push('/test6')">
					COMPUTERISED TESTS: The ATAVT Perception Test
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>


<script>


export default {
	name: "HomeView",

	components: {},
};
</script>
