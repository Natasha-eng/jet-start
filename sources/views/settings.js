import { JetView } from "webix-jet";

export default class Settings extends JetView {
	config() {
		return {
			rows: [
				{ view: "segmented", css: "backgorund-white", options: ["en", "ru"], inputWidth: 200, },
				{ css: "backgorund-white", }

			]
		};
	}
}
