import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import FormView from "./form";

export default class Contacts extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "wide",
			localId: "contacts",
			cols: [
				{
					type: "form",
					rows: [
						{
							view: "list",
							localId: "contactsList",
							scrollX: false,
							select: true,
							template: function (obj) {

								return (
									"<div class='space'> <div>" + obj.Name + "  " + obj.Email + "</div> " +
									"<span class='removeBtn webix_icon wxi-trash'></span></div>"
								);
							},
							css: "webix_shadow_medium app_start",
							click: (id) => {
								this.setParam("id", id, true);
							},
							onClick: {
								removeBtn: function (ev, id) {
									contacts.remove(id);

									let firstId = this.getFirstId();

									if (firstId) {
										contacts.callEvent("onStoreUpdated", [firstId]);
									} else {
										contacts.callEvent("onStoreUpdated", [null]);
									}
									return false;
								},
							}
						},
						{
							view: "button",
							value: _("Add new contact"),
							css: "webix_primary",
							inputWidth: 250,
							click: () => {

								const newContact = {
									"Name": "",
									"Email": "",
									"Status": 1,
									"Country": 1
								};

								contacts.add(newContact);
								contacts.callEvent("onStoreUpdated", [newContact.id]);
							}
						},
					]
				},
				FormView,
			],
		};
	}

	init() {
		const contactsList = this.$$("contactsList");
		contactsList.parse(contacts);

		this.on(contactsList, "onSelectChange", (id) => {
			if (!id[0]) {
				this.setParam("id", null, true);
			} else {
				this.setParam("id", id[0], true);
			}

		});

		const firstId = contacts.getFirstId();

		if (firstId) {
			contactsList.select(firstId);
		}
	}

	ready() {
		const contactsList = this.$$("contactsList");

		// const contactsList = this.$$("contactsList");
		// this.on(this.app, "onAfterSelect", (selectedItem) => {
		// 	this.webix.storage.local.put("state", selectedItem);
		// 	console.log('code', selectedItem)
		// }); 

		this.on(contacts, "onStoreUpdated", (id) => {
			contactsList.select(id);
		});
	}
}
