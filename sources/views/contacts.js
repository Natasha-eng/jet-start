import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";

export default class Contacts extends JetView {
	config() {

		return {
			rows: [
				{
					borderless: true,
					margin: 10,
					fillspace: true,
					cols: [
						{ view: "list", localId: "contactsList", scroll: false, select: true, template: "#Name# - #Email#", css: "webix_shadow_medium app_start" },
						{
							view: "form", margin: 20, elements: [
								{ view: "text", label: "Name" },
								{ view: "text", type: "password", label: "Email" },
								{ view: "text", type: "password", label: "Status" },
								{ view: "text", type: "password", label: "Country" },
								{
									cols: [
										{ view: "button", value: "Save", css: "webix_primary" },
										{ view: "button", value: "Cancel" }
									]
								},
								{}
							], css: "webix_shadow_medium app_start"
						},
					],
				},				
			],
		};
	}
	init() {
		this.$$("contactsList").parse(contacts);
	}
}
