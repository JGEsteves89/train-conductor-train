<template>
	<v-container class="text-center">
		<v-btn color="primary" @click="toggleAudio">
			{{ isPlaying ? 'Stop Sound' : 'Play Sound' }}
		</v-btn>
	</v-container>

</template>

<script>
export default {
	name: "SoundPlayer",
	props: {
		soundPath: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			audio: null,
			isPlaying: false
		};
	},
	methods: {
		toggleAudio() {
			if (!this.audio) {
				this.createAudio();
			}

			if (this.isPlaying) {
				this.audio.pause();
				this.audio.currentTime = 0;
				this.isPlaying = false;
			} else {
				this.audio.play();
				this.isPlaying = true;
				this.$emit('audio-play');
			}
		},
		createAudio() {
			if (this.audio) {
				this.audio.pause();
				this.audio = null;
			}
			this.audio = new Audio(this.soundPath);
			this.audio.addEventListener('ended', () => {
				this.isPlaying = false;
				this.$emit('audio-ended');
			});
		}
	},
	watch: {
		soundPath(newPath, oldPath) {
			// Recreate audio element when soundPath changes
			this.isPlaying = false;
			this.createAudio();
		}
	},
	beforeDestroy() {
		if (this.audio) {
			this.audio.pause();
			this.audio = null;
		}
	}
};
</script>
