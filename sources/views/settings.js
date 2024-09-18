import { JetView } from "webix-jet";

export default class Settings extends JetView {

	config() {
		const { getLang, setLang } = this.app.getService("locale");

		return {
			type: "form",
			rows: [
				{
					view: "segmented",
					css: "backgorund-white",
					value: getLang(),
					options: ["en", "ru"],
					inputWidth: 200,
					on: {
						onChange: (value) => setLang(value)
					}
				},
				{}
			]
		};
	}
}
