import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import FormView from "./form";

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
					css: "webix_shadow_medium app_start",
					click:function (id) {				
						this.$scope.setParam("id", id, true);
						const selectedItem = this.getItem(id);
						this.$scope.app.callEvent("onAfterSelect", [selectedItem]);
						
					}
				},
				FormView,
			],
		};
	}

	init() {
		const contactsList = this.$$("contactsList");
		contactsList.parse(contacts);

		let firstId = contactsList.getFirstId();

		if (contactsList.exists(firstId)) {
			contactsList.select(firstId);
			this.setParam("id", firstId, true);
		}
	}

	urlChange () {
		const id = this.getParam("id");
		const selectedItem = this.$$("contactsList").getItem(id);
	    this.app.callEvent("onAfterSelect", [selectedItem]);
	}

}
