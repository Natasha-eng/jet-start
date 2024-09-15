import { JetView } from "webix-jet";

export default class Settings extends JetView {
	config() {
		return { 
			rows: [
				{view:"segmented", options:["en", "ru"],  width: 200,},
				{}
			]			 
		};
	}
}
