<template>
	<v-container>
		<v-card class="pa-6 mb-6">
			<h2 class="text-h5 font-weight-bold mb-4">Train Code: {{ currentTest.trainCode }}</h2>

			<v-row dense>
				<!-- Left Panel: Display -->
				<v-col cols="12" md="8">
					<v-card outlined class="pa-4">
						<h3 class="text-subtitle-1 font-weight-medium mb-4">Display Panel</h3>

						<v-row dense>
							<v-col cols="12" sm="6">
								<div class="mb-1 text-caption font-weight-medium">🔌 Power Level</div>
								<PowerGauge :level="currentTest.displayPanel.power" />
							</v-col>

							<v-col cols="12" sm="6">
								<div class="mb-1 text-caption font-weight-medium">🧹 Wipers</div>
								<WipersModel :status="currentTest.displayPanel.wipers.status"
									:code="currentTest.displayPanel.wipers.code" />
							</v-col>

							<v-col cols="12" sm="6">
								<div class="mb-1 text-caption font-weight-medium">🧽 Washers</div>
								<WasherProgressBar :value="currentTest.displayPanel.washers" />
							</v-col>

							<v-col cols="12" sm="6">
								<div class="mb-1 text-caption font-weight-medium">🕶️ Electronic Blind</div>
								<ElectricBinders :value="currentTest.displayPanel.electronicBlindBars" />
							</v-col>
						</v-row>
					</v-card>
				</v-col>

				<!-- Right Panel: Technical Info -->
				<v-col cols="12" md="4">
					<v-card outlined class="pa-4">
						<h3 class="text-subtitle-1 font-weight-medium mb-4">Technical Info</h3>

						<v-list dense>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="text-caption font-weight-bold">Power
										Code:</v-list-item-title>
									<v-list-item-subtitle>{{ currentTest.technicalInfo.powerBoxCode
									}}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="text-caption font-weight-bold">Wipers
										Code:</v-list-item-title>
									<v-list-item-subtitle>{{ currentTest.technicalInfo.wipersManufacturerCode
									}}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="text-caption font-weight-bold">Blind
										Model:</v-list-item-title>
									<v-list-item-subtitle>{{ currentTest.technicalInfo.electronicBlindModel
									}}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="text-caption font-weight-bold">Water
										Pressure:</v-list-item-title>
									<v-list-item-subtitle>{{ currentTest.technicalInfo.washerPressure
									}}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-card>
				</v-col>
			</v-row>
		</v-card>


		<v-card class="pa-4 mb-4">
			<h3 class="font-semibold mb-2">Identifying a Fault - Rules</h3>
			<ul>
				<li>🔌 Power Box: Fault if power is <strong>Low</strong> or <strong>Medium</strong></li>
				<li>🧽 Washers: Fault if value is <strong>15 or more</strong></li>
				<li>🧹 Wipers: Fault if <strong>Status is 'TPX'</strong> and <strong>Code is 'ABN'</strong></li>
				<li>🕶️ Electronic Blind: Fault if it shows <strong>2 or fewer bars</strong></li>
			</ul>
		</v-card>

		<v-card class="pa-4 mb-4">
			<h3 class="font-semibold mb-2">Fault Finder Guide Summary</h3>
			<ul>
				<li><strong>Power Box:</strong>
					<ul>
						<li>If Medium → Code: ZPX</li>
						<li>If Low and Code is 3:
							<ul>
								<li>Pressure ≤ 8 → Code: 265</li>
								<li>Pressure ≥ 9 → Code: 562</li>
							</ul>
						</li>
					</ul>
				</li>
				<li><strong>Electronic Blind:</strong>
					<ul>
						<li>1 bar + model 'BRN' → Code: RPT</li>
						<li>2 bars + model 'PRN' → Code: BOP</li>
					</ul>
				</li>
				<li><strong>Wipers:</strong>
					<ul>
						<li>Manufacturer Code 158 → Code: AAC</li>
						<li>Else → Code: CAA</li>
					</ul>
				</li>
				<li><strong>Washers:</strong>
					<ul>
						<li>15–20:
							<ul>
								<li>Pressure ≤ 8 → Code: TPW</li>
								<li>Pressure ≥ 9 → Code: RTW</li>
							</ul>
						</li>
						<li>21+:
							<ul>
								<li>Pressure ≤ 6 → Code: ZPZ</li>
								<li>Else → Code: 3ZJ</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</v-card>

		<v-card class="pa-4 mb-4">
			<h3 class="font-semibold mb-2">Your Response</h3>
			<v-select v-model="selectedFault" :items="['Power Box', 'Electronic Blind', 'Wipers', 'Washers']"
				label="Location of Fault" outlined />
			<v-text-field v-model="userCode" label="Enter Fault Code" outlined class="mt-3" />
			<v-btn class="mt-4" color="primary" @click="checkAnswer">Submit</v-btn>
			<div v-if="feedback" class="mt-4 font-semibold">{{ feedback }}</div>
		</v-card>

	</v-container>
</template>

<script>
import ElectricBinders from './ElectricBinders.vue'
import PowerGauge from './PowerGauge.vue'
import WasherProgressBar from './WasherProgressBar.vue'
import WipersModel from './WipersModel.vue'

function getRandomItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function generateRandomTest() {
	const powerLevels = ['low', 'medium', 'high']
	const wiperStatuses = ['TPX', 'TPA']
	const wiperCodes = ['ABN', 'TRN']
	const blindBars = [1, 2, 3, 4]
	const washerValues = [10, 15, 18, 22]
	const blindModels = ['BRN', 'PRN', 'RRT']
	const washerPressure = [5, 8, 9, 10]
	const manufacturerCodes = [158, 6, 9]
	const powerCodes = [3, 5]

	return {
		trainCode: Math.random().toString(36).substring(2, 4).toUpperCase(),
		displayPanel: {
			power: getRandomItem(powerLevels),
			wipers: { status: getRandomItem(wiperStatuses), code: getRandomItem(wiperCodes) },
			washers: getRandomItem(washerValues),
			electronicBlindBars: getRandomItem(blindBars),
		},
		technicalInfo: {
			powerBoxCode: getRandomItem(powerCodes),
			wipersManufacturerCode: getRandomItem(manufacturerCodes),
			electronicBlindModel: getRandomItem(blindModels),
			washerPressure: getRandomItem(washerPressure),
		},
	}
}

function evaluate(test) {
	const faults = []
	const { displayPanel, technicalInfo } = test

	if (displayPanel.power === 'low' || displayPanel.power === 'medium') {
		faults.push('Power Box')
	}
	if (displayPanel.electronicBlindBars <= 2) {
		faults.push('Electronic Blind')
	}
	if (displayPanel.wipers.status === 'TPX' && displayPanel.wipers.code === 'ABN') {
		faults.push('Wipers')
	}
	if (displayPanel.washers >= 15) {
		faults.push('Washers')
	}

	const priority = ['Power Box', 'Electronic Blind', 'Wipers', 'Washers']
	const topFault = priority.find(f => faults.includes(f))
	let code = '---'

	switch (topFault) {
		case 'Power Box':
			if (displayPanel.power === 'medium') {
				code = 'ZPX'
			} else if (displayPanel.power === 'low' && technicalInfo.powerBoxCode === 3) {
				code = technicalInfo.washerPressure <= 8 ? '265' : '562'
			}
			break
		case 'Electronic Blind':
			if (displayPanel.electronicBlindBars === 1 && technicalInfo.electronicBlindModel === 'BRN') {
				code = 'RPT'
			} else if (displayPanel.electronicBlindBars === 2 && technicalInfo.electronicBlindModel === 'PRN') {
				code = 'BOP'
			}
			break
		case 'Wipers':
			code = technicalInfo.wipersManufacturerCode === 158 ? 'AAC' : 'CAA'
			break
		case 'Washers':
			if (displayPanel.washers >= 15 && displayPanel.washers <= 20) {
				code = technicalInfo.washerPressure <= 8 ? 'TPW' : 'RTW'
			} else if (displayPanel.washers >= 21) {
				code = technicalInfo.washerPressure <= 6 ? 'ZPZ' : '3ZJ'
			}
			break
	}

	return { topFault, code }
}

export default {
	name: 'DFFTTest',
	components: { PowerGauge, WipersModel, WasherProgressBar, ElectricBinders },
	data() {
		return {
			currentTest: generateRandomTest(),
			selectedFault: null,
			userCode: '',
			feedback: '',
		}
	},
	methods: {
		generateTest() {
			this.currentTest = generateRandomTest()
			this.selectedFault = ''
			this.userCode = ''
			this.feedback = ''
		},
		checkAnswer() {
			const expected = evaluate(this.currentTest)
			if (this.selectedFault === expected.topFault && this.userCode.trim().toUpperCase() === expected.code) {
				this.feedback = '✅ Correct!'
			} else {
				this.feedback = `❌ Incorrect. Top fault: ${expected.topFault}, Code: ${expected.code}`
			}
		},
	},

}
</script>

<style scoped>
.font-semibold {
	font-weight: 600;
}
</style>
