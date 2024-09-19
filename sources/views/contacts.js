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
							click: function (id) {
								this.$scope.setParam("id", id, true);
							},
							onClick: {
								removeBtn: function (ev, id) {
									contacts.remove(id);

									const contactsList = this.$scope;
									let firstId = this.getFirstId();

									if (firstId) {
										this.select(firstId);
										contactsList.setParam("id", firstId, true);
									} else {
										contactsList.setParam("id", null, true);
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
								this.app.callEvent("onContactAdd", [newContact]);
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

		let firstId = contacts.getFirstId();

		if (contacts.exists(firstId)) {
			contactsList.select(firstId);
			this.setParam("id", firstId, true);
		}
	}

	ready() {

		const contactsList = this.$$("contactsList");
		// this.on(this.app, "onAfterSelect", (selectedItem) => {
		// 	this.webix.storage.local.put("state", selectedItem);
		// 	console.log('code 1', selectedItem)
		// });

		this.on(this.app, "onContactAdd", (data) => {
			const lastId = contacts.getLastId();
			contactsList.select(lastId);
			this.setParam("id", lastId, true);
		});
	}
}
