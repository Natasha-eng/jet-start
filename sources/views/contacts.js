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
					on: {
						onAfterSelect: function (id) {
							console.log('sselect', id)
							this.$scope.setParam("id", id, true);

						}
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
		console.log('firstId', firstId)

		if (contactsList.exists(firstId)) {
			contactsList.select(firstId)
			this.setParam("id", firstId, true);
			const selectedItem = contactsList.getItem(firstId)
			console.log('item', selectedItem)
			this.app.callEvent("onSelectChange", [selectedItem]);
		}
	}

}
