import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";

export default class Contacts extends JetView {
	config() {

		return {
			type: "wide",
			cols: [
				{
					view: "list",
					localId: "contactsList",
					scrollX: false,
					select: true,
					template: "#Name# - #Email#",
					css: "webix_shadow_medium app_start"
				},
				{
					view: "form",
					margin: 20,
					elements: [
						{ view: "text", label: "Name" },
						{ view: "text", type: "email", label: "Email" },
						{ view: "text", type: "text", label: "Status" },
						{ view: "text", type: "text", label: "Country" },
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
		};
	}

	init() {
		this.$$("contactsList").parse(contacts);
	}
}
