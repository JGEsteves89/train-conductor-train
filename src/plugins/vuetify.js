import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#282828', // 🔁 Replace with any Vuetify color
				// You can also define others like secondary, accent, etc.
			},
		},
	},
});