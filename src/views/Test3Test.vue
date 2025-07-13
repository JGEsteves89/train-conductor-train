<template>
	<div>
		<div class="text-center mb-2">
			<h2>{{ currentTest.title }}</h2>
		</div>

		<div v-if="currentState !== 1" class="text-center mb-2">
			<pre class="formatted-text">{{ currentTest.text }}</pre>
			<v-btn v-if="currentState === 0" block color="primary" class="mb-4" @click="setState(1)">
				Ready
			</v-btn>
		</div>

		<div v-if="currentState === 1">
			<MultipleAnswersQuestion :questionData="currentTest.questions[currentQuestionIndex]"
				:questionIndex="currentQuestionIndex" :selected="userAnswers[currentQuestionIndex]"
				@answer-selected="onAnswerSelected" />
			<v-btn class="mt-4" :disabled="userAnswers[currentQuestionIndex] === null" @click="nextQuestion">
				Next
			</v-btn>
		</div>

		<div v-if="currentState === 2">
			<h3>Results</h3>
			<div v-for="(q, idx) in currentTest.questions" :key="idx" class="mb-4">
				<MultipleAnswersQuestion :questionData="q" :questionIndex="idx" :selected="userAnswers[idx]"
					:disabled="true" />
			</div>
			<v-btn block color="primary" class="mb-4" @click="goToTest(testIndex + 1)">
				New Test
			</v-btn>
		</div>


	</div>
</template>
<style scoped>
.formatted-text {
	text-align: left;
	white-space: pre-wrap;
	font-family: inherit;
	/* optional: keep your app's font */
}
</style>
<script>
import MultipleAnswersQuestion from "@/components/MultipleAnswersQuestion.vue";
const TESTS = [
	{
		title: "Duties of Drivers - Headlights, Marker lights and Headcodes",
		text: `The driver must ensure that:

\ta) the marker and/or head code lights at the front of the train are illuminated when on a running line; or whenever moving on any line or siding. This also applies when the train is being propelled in the right direction; and,

\tb) where provided, the headlight is illuminated (and the correct day/night beam is in use) whenever moving on a running line. The headlight must not be used in depots, yards, or sidings or when stabled on a running line.

If there is a partial failure of illumination, the train may continue normally to the first location where it can be taken out of service without causing delay or cancellation. If there is a partial fault of the headlight, the other day/night beam must be used when possible.

If there is a complete failure of illumination, the driver must arrange for a white light to be exhibited; a hand lamp may be used for this purpose. During darkness or fog or falling snow, the train must be worked at caution to the first place where the defect can be remedied, or the train taken out of service. Frequent use must be made of the horn to warn anyone on or near the line.

Before proceeding to the other end of the train at a reverse sign point, the driver must ensure that any head or marker light or head code is extinguished, and any built-in tail lamps are switched on.`,
		questions: [
			{
				question: "Where should the headlight be illuminated?",
				multipleAnswers: [
					"In depots.",
					"In yards or sidings.",
					"When stabled on a running line.",
					"Whenever moving on a running line."
				],
				answer: 3
			},
			{
				question: "What should happen if there is a partial failure of illumination?",
				multipleAnswers: [
					"The driver must arrange for a white light to be exhibited.",
					"The train may continue normally to the first location where it can be taken out of service.",
					"The train must be worked at caution.",
					"The train must not proceed until repair work is carried out."
				],
				answer: 1
			},
			{
				question: "What should happen if there is a complete failure of illumination?",
				multipleAnswers: [
					"Built-in tail lamps must be switched on.",
					"The other day/night beam must be used when possible.",
					"A hand-lamp must not be used.",
					"A white light must be exhibited."
				],
				answer: 3
			},
			{
				question: "At a reversing point, what should the driver do before proceeding to the other end of the train?",
				multipleAnswers: [
					"Ensure that there is no complete failure of illumination.",
					"Ensure that any head or marker light or head code is extinguished.",
					"Make frequent use of the horn to warn anyone on or near the line.",
					"Ensure that any built-in lamps are switched off."
				],
				answer: 1
			},
			{
				question: "What should happen if there is a partial fault of the headlight?",
				multipleAnswers: [
					"The other day/night beam must be used.",
					"It must be turned off.",
					"The train must be worked at caution.",
					"The train must be taken out of service."
				],
				answer: 0
			},
			{
				question: "When must the horn be used?",
				multipleAnswers: [
					"If the train has a partial failure of illumination.",
					"If the train is reversing.",
					"To warn anyone on or near the line.",
					"When the train is being worked at caution."
				],
				answer: 2
			},
			{
				question: "What things must the driver check are working when on a running line?",
				multipleAnswers: [
					"Headlight, marker, and head code light.",
					"Headlight, horn, and tail lamps.",
					"Hand lamp, horn, and tail lamps.",
					"Head code light, markers, and tail lamps."
				],
				answer: 0
			}
		]
	},
	{
		title: "Automatic Half Barrier Crossing (AHBC) and Locally Monitored Crossings",
		text: `5.2 Automatic half barrier crossing (AHBC)
You must make sure an attendant has been appointed and local control taken at each AHBC throughout the time the possession is in place.

Exceptions
You do not need to do this if:
• the crossing controls will not be activated by the work
• the only movements over the crossing will be engineering trains passing normally in a direction provided with controls
• it is shown in the notices that the AHBC will be on local control only while it is affected by the work or train movements.

5.3 Automatic barrier crossing locally monitored (ABCL) and automatic open crossing locally monitored (AOCL)
You must make sure the road traffic signals are switched off and the audible warnings disconnected at each ABCL and AOCL throughout the time the possession is in place.
You must also make sure the barriers are kept in the raised position at each ABCL.

Exceptions
You do not need to do this if:
• the crossing controls will not be activated by the work
• the only movements over the crossing will be engineering trains passing normally in a direction provided with controls.`,
		questions: [
			{
				question: "What must you ensure at each AHBC during the possession?",
				multipleAnswers: [
					"An attendant has been appointed and local control taken.",
					"The barriers are kept lowered.",
					"Road traffic signals are switched on.",
					"The audible warnings are active."
				],
				answer: 0
			},
			{
				question: "When do you NOT need to appoint an attendant or take local control at an AHBC?",
				multipleAnswers: [
					"If crossing controls will be activated by the work.",
					"If the only movements over the crossing are engineering trains passing normally with controls.",
					"If the crossing is unmanned.",
					"If the crossing is closed permanently."
				],
				answer: 1
			},
			{
				question: "At ABCL and AOCL crossings, what must be done with road traffic signals during possession?",
				multipleAnswers: [
					"They must be switched on.",
					"They must be switched off.",
					"They must flash intermittently.",
					"They must be controlled remotely."
				],
				answer: 1
			},
			{
				question: "What must be done with audible warnings at ABCL and AOCL crossings during possession?",
				multipleAnswers: [
					"They must be disconnected.",
					"They must be kept active.",
					"They must be silenced temporarily but remain connected.",
					"They must be replaced with hand signals."
				],
				answer: 0
			},
			{
				question: "What must be ensured about the barriers at ABCL crossings during possession?",
				multipleAnswers: [
					"Barriers must be kept lowered.",
					"Barriers must be kept in the raised position.",
					"Barriers must be removed.",
					"Barriers must be operated manually."
				],
				answer: 1
			},
			{
				question: "Under which condition is it not necessary to switch off road signals or disconnect audible warnings at ABCL/AOCL?",
				multipleAnswers: [
					"If the crossing controls will be activated by the work.",
					"If the only movements are engineering trains passing normally in a direction with controls.",
					"If the crossing is under permanent closure.",
					"If the crossing is only used by passenger trains."
				],
				answer: 1
			},
			{
				question: "What is a shared exception for AHBC, ABCL, and AOCL crossings regarding control during possession?",
				multipleAnswers: [
					"Controls need not be altered if the crossing controls will not be activated by the work.",
					"Controls must always be manually overridden.",
					"Crossings must be closed to all traffic.",
					"Only local control can be used."
				],
				answer: 0
			}
		]
	},
	{
		title: "Detonator Protection, Change of Personnel, and Giving Up the Possession",
		text: `10.3 Placing the new detonator protection
You must make sure the new detonator protection is placed before the old detonator protection is removed.

11 Change of personnel
11.1 Change of PICOP
If you are going off duty, you must:
• tell the new PICOP about the possession arrangements
• hand the RT3198 form to the new PICOP
• tell the signaller the name of the new PICOP.
If you are the new PICOP, you must sign the RT3198 form.

11.2 Change of ES or SWL
The ES or SWL will tell you the name of the new ES or SWL if there is a change. You must record the details on the RT3198 form.

12 Giving up the possession
12.1 Making sure the work is complete
When each ES or SWL gives you an assurance that work is complete at their work site, you must tell them to remove the WSMBs.
You must not give permission to remove the WSMBs if you have given permission for a movement to proceed towards the work site.
The ES or SWL will tell you if a train is standing within the work site at a signal or block marker where it has been agreed that the possession will be given up around a train. You must record the details on the RT3198 form.
When the ES or SWL tells you the WSMBs have been removed, you must record the details on the RT3198 form.
When each IWA or COSS who is relying upon the possession arrangements in your area of control tells you they no longer need the possession arrangements, you must record the name of each IWA or COSS and the time on your RT3198 form.

12.2 Giving up the possession around engineering trains
You may give up the possession with engineering trains standing at stop signals or block markers on the line under possession, as long as all of the following apply.
• The line is signalled by track circuit block or ERTMS and the trains are standing at a location where the detection is by track circuits and not by axle counters.
• The movement, after the possession is given up, will be in the normal signalled direction and will be driven from the leading cab.
You must make sure:
• you agree with the signaller the stop signals or block markers to be used
• all personnel on the engineering trains are told that the possession is to be given up and the line must be considered open.
You must not start the arrangements to give up the possession until the signaller has confirmed that engineering trains have arrived at the agreed signals or block markers.`,
		questions: [
			{
				question: "What must be done before the old detonator protection is removed?",
				multipleAnswers: [
					"The area must be cleared.",
					"The train must stop.",
					"The new detonator protection must be placed.",
					"The signaller must give permission."
				],
				answer: 2
			},
			{
				question: "What must the off-duty PICOP do before leaving?",
				multipleAnswers: [
					"Call the driver of the train.",
					"Destroy the RT3198 form.",
					"Inform the new PICOP, hand over the RT3198 form, and notify the signaller.",
					"Switch off all warning systems."
				],
				answer: 2
			},
			{
				question: "What must the new PICOP do after receiving the RT3198 form?",
				multipleAnswers: [
					"Notify all COSS and IWA staff.",
					"Sign the RT3198 form.",
					"Close the possession immediately.",
					"Request a new form."
				],
				answer: 1
			},
			{
				question: "What should you record on the RT3198 if there is a change of ES or SWL?",
				multipleAnswers: [
					"Only the time of the change.",
					"The details of the new ES or SWL.",
					"The name of the PICOP.",
					"The location of the worksite."
				],
				answer: 1
			},
			{
				question: "When can WSMBs be removed?",
				multipleAnswers: [
					"After the signaller gives permission.",
					"Once assurance is given and no movement is permitted towards the site.",
					"When the IWA or COSS arrives.",
					"Anytime the worksite is empty."
				],
				answer: 1
			},
			{
				question: "What must happen before you start arrangements to give up the possession around engineering trains?",
				multipleAnswers: [
					"The ES must confirm the train has departed.",
					"The signaller must confirm trains are at agreed signals or markers.",
					"The RT3198 must be discarded.",
					"All personnel must leave the train."
				],
				answer: 1
			},
			{
				question: "What must be true for giving up the possession around engineering trains?",
				multipleAnswers: [
					"The train must be driven from the trailing cab.",
					"Axle counters must be used for detection.",
					"The movement must be in the normal signalled direction and detection by track circuits.",
					"The ES must ride in the cab."
				],
				answer: 2
			}
		]
	},
	{
		title: "Definitions - Drivers, Engineering Trains, OTP, and Speed in Possession",
		text: `1 Definitions

Driver
This includes an operator of an on-track machine.

Engineering train
This includes on-track machines but does not include on-track plant (OTP).

Machine controller (MC)
The MC is the person with overall responsibility for the safe operation of OTP and will be identified by an armlet or badge with MACHINE CONTROLLER or MC in black letters on a white background.
When the MC is also competent as a crane controller, they will instead wear an armlet or badge with CRANE CONTROLLER or CC in black letters on a white background.

Maximum speed in a possession
Depending on any lower speed that may apply the maximum speed entering, leaving or within a possession is 40 km/h (25 mph).

On-track plant (OTP)
Also known as ‘in possession only rail vehicles’ and includes road-rail vehicles (RRV), rail-mounted maintenance machines (RMMM) and RRV/RMMM trailers and attachments with guidance wheels.`,
		questions: [
			{
				question: "Who is considered a driver?",
				multipleAnswers: [
					"Only the person driving a passenger train.",
					"Only qualified train drivers.",
					"Any person operating a signal.",
					"An operator of an on-track machine."
				],
				answer: 3
			},
			{
				question: "What is included in the term 'engineering train'?",
				multipleAnswers: [
					"On-track machines and on-track plant (OTP).",
					"Only passenger trains used for engineering purposes.",
					"On-track machines, but not on-track plant (OTP).",
					"Only rail-mounted maintenance machines."
				],
				answer: 2
			},
			{
				question: "What identifies a Machine Controller (MC)?",
				multipleAnswers: [
					"A white helmet with black stripes.",
					"An armlet or badge with MACHINE CONTROLLER or MC in black on white.",
					"A vest with yellow and blue stripes.",
					"A radio unit and checklist folder."
				],
				answer: 1
			},
			{
				question: "What badge does a Machine Controller wear when also a Crane Controller?",
				multipleAnswers: [
					"A red badge with MC/CC on it.",
					"An armlet or badge with CRANE CONTROLLER or CC in black on white.",
					"A badge with both MACHINE and CRANE in green.",
					"A badge labeled OTP LEAD."
				],
				answer: 1
			},
			{
				question: "What is the maximum speed allowed within a possession?",
				multipleAnswers: [
					"20 km/h (12 mph).",
					"30 km/h (18 mph).",
					"50 km/h (31 mph).",
					"40 km/h (25 mph), unless a lower speed applies."
				],
				answer: 3
			},
			{
				question: "Which of the following is classified as On-track Plant (OTP)?",
				multipleAnswers: [
					"Engineering trains.",
					"Road-rail vehicles (RRV).",
					"Passenger trains.",
					"Signalling equipment."
				],
				answer: 1
			},
			{
				question: "Which of the following is *not* included in the definition of Engineering Train?",
				multipleAnswers: [
					"On-track machines.",
					"Freight wagons.",
					"On-track plant (OTP).",
					"Ballast trains."
				],
				answer: 2
			}
		]
	},
	{
		title: "Personal Safety near the Conductor Rail (CRE)",
		text: `4 Personal safety

4.1 Precautions that must be taken
You must always take care when working close to the CRE. You must also take special care if you or anything you are using or carrying will be nearer than 300 mm (1 foot) to the CRE.

If you are applying a track-circuit operating clip, or a track-circuit operating device (T-COD), you must always apply it to the running rail furthest from the conductor rail first and then to the running rail nearest to the conductor rail.

When removing a track-circuit operating clip, or a T-COD, you must remove it from the rail nearest to the conductor rail first and then from the rail furthest from the conductor rail.

If you have to place detonators, you must attach them to the running rail which is furthest from the conductor rail.

If the emergency services need to go on or near the line, the person in charge at the site must tell the officer in charge from each emergency service about the presence of the conductor rail and which parts have been switched off.

If you are to manually operate or secure points and the conductor rail is not gapped or protected by guard boarding next to the motor or blade to be secured, you must place a conductor rail shield over the conductor rail before starting work.`,
		questions: [
			{
				question: "How close can you or your equipment be to the conductor rail (CRE) before taking special care?",
				multipleAnswers: [
					"500 mm (2 feet)",
					"300 mm (1 foot)",
					"150 mm (6 inches)",
					"1 meter"
				],
				answer: 1
			},
			{
				question: "When applying a track-circuit operating clip or T-COD, which rail should you apply it to first?",
				multipleAnswers: [
					"The rail nearest to the conductor rail",
					"Any rail, the order doesn't matter",
					"The running rail furthest from the conductor rail",
					"The conductor rail itself"
				],
				answer: 2
			},
			{
				question: "When removing a track-circuit operating clip or T-COD, which rail should you remove it from first?",
				multipleAnswers: [
					"The rail furthest from the conductor rail",
					"The conductor rail itself",
					"The rail nearest to the conductor rail",
					"Both at the same time"
				],
				answer: 2
			},
			{
				question: "Where should detonators be placed in relation to the conductor rail?",
				multipleAnswers: [
					"On the conductor rail itself",
					"On the rail nearest the conductor rail",
					"On the running rail furthest from the conductor rail",
					"In between both rails"
				],
				answer: 2
			},
			{
				question: "What must the person in charge do when emergency services need access near the CRE?",
				multipleAnswers: [
					"Clear the area immediately",
					"Hand out insulated gloves",
					"Tell the officer in charge from each emergency service about the conductor rail and what’s switched off",
					"Turn off all power"
				],
				answer: 2
			},
			{
				question: "What must be used if manually operating or securing points and the conductor rail is not gapped or protected?",
				multipleAnswers: [
					"A safety vest",
					"A warning sign",
					"A conductor rail shield",
					"An insulated crowbar"
				],
				answer: 2
			},
			{
				question: "Why must care be taken when working near the CRE?",
				multipleAnswers: [
					"Because it's sharp",
					"Because it might be slippery",
					"Because it can carry live electrical current",
					"Because it's difficult to see"
				],
				answer: 2
			}
		]
	},
	{
		title: "Giving Up or Suspending the Line Blockage",
		text: `5 Giving up or suspending the line blockage

5.1 When the line blockage is to be given up or is to be suspended
When the line blockage is to be given up or is to be suspended, you must:
• make sure that any work that is to continue does not need a line blockage
• remove any red flag or red light that has been placed in the four-foot
• remove any additional protection arrangements as shown in section 2 of this handbook.

If you have the staff or token as shown in section 2.5, you must:
• return the staff or token to the signal box at either end of the section, or
• return the token to an instrument that is not at a signal box.

If additional protection was provided by a disconnection as shown in section 2.3, after you have told the signaller that the line blockage is no longer needed or suspended, you must ask the signaller to get the signalling technician to reconnect the equipment.`,
		questions: [
			{
				question: "What must you confirm before giving up or suspending a line blockage?",
				multipleAnswers: [
					"That the signaller is available",
					"That the weather conditions are clear",
					"That any continuing work does not need a line blockage",
					"That a new line blockage has been arranged"
				],
				answer: 2
			},
			{
				question: "What must be removed from the four-foot when a line blockage is suspended or given up?",
				multipleAnswers: [
					"Speed restriction signs",
					"Red flag or red light",
					"Ballast",
					"Track-circuit clips"
				],
				answer: 1
			},
			{
				question: "What should be done with additional protection arrangements?",
				multipleAnswers: [
					"They must be doubled",
					"They must remain in place until the signaller arrives",
					"They must be removed as shown in section 2 of the handbook",
					"They must be handed over to the next shift"
				],
				answer: 2
			},
			{
				question: "If you have a staff or token, where must it be returned?",
				multipleAnswers: [
					"To the nearest depot",
					"To the signalling technician",
					"To the signal box or appropriate instrument",
					"To the operations manager"
				],
				answer: 2
			},
			{
				question: "Who must you contact to have a disconnection protection reconnected?",
				multipleAnswers: [
					"The train driver",
					"The operations supervisor",
					"The signaller",
					"The engineering supervisor"
				],
				answer: 2
			},
			{
				question: "Who arranges for the signalling technician to reconnect the equipment?",
				multipleAnswers: [
					"The person in charge on site",
					"The driver",
					"The operations controller",
					"The signaller"
				],
				answer: 3
			},
			{
				question: "What must you do after informing the signaller that the line blockage is no longer needed and protection was by disconnection?",
				multipleAnswers: [
					"Remove all signage",
					"Call the technician directly",
					"Ask the signaller to get the signalling technician to reconnect the equipment",
					"Return to site office"
				],
				answer: 2
			}
		]
	}
];
export default {
	name: "Test3Test",
	components: { MultipleAnswersQuestion },
	props: {
		index: { type: String, default: "0" }
	},
	data() {
		return {
			state: 0,
			showSolution: false,
			currentQuestionIndex: 0,
			userAnswers: []
		};
	},
	computed: {
		testIndex() {
			let idx = parseInt(this.index, 10);
			return isNaN(idx) ? 0 : idx;
		},
		currentTest() {
			if (this.testIndex < 0 || this.testIndex >= TESTS.length) {
				this.$router.push("/test3/");
				return null;
			}
			return TESTS[this.testIndex];
		},
		currentState() {
			if (this.userAnswers.length === this.currentTest.questions.length &&
				this.userAnswers.every(ans => ans !== null && ans !== undefined)) {
				this.state = 2;
			}
			return this.state;
		}
	},
	watch: {
		testIndex(newIndex) {
			if (newIndex < 0 || newIndex >= TESTS.length) {
				this.goToTest(0);
			} else {
				this.listeningState = "not-listened";
				this.resetTest();
			}
		}
	},
	mounted() {
		if (this.testIndex < 0 || this.testIndex >= TESTS.length) {
			this.$router.push("/test3/");
			return;
		}
		this.resetTest();
		window.scrollTo({ top: 0, behavior: "smooth" });
	},
	methods: {
		resetTest() {
			this.state = 0; // Reset state to initial
			this.currentQuestionIndex = 0;
			this.userAnswers = Array(this.currentTest.questions.length).fill(null);
			this.showSolution = false;
		},
		onAnswerSelected({ questionIndex, answer }) {
			this.$set(this.userAnswers, questionIndex, answer);
		},
		nextQuestion() {
			if (this.currentQuestionIndex < this.currentTest.questions.length - 1) {
				this.currentQuestionIndex++;
			} else {
				// All questions answered, show results
				this.showSolution = true;
			}
		},
		goToTest(index) {
			this.resetTest(); // Reset everything before navigation
			this.$router.push("/test3/");
			this.$router.replace({ name: "Test3Test", params: { index: index.toString() } });
		},
		setState(newState) {
			this.state = newState;
		},
	}
};
</script>
