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

							onClick: {
								removeBtn: function (ev, id) {
									contacts.remove(id);
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
				webix.storage.local.remove("selectedId");
			} else {
				this.setParam("id", id[0], true);
				webix.storage.local.put("selectedId", id);
			}
		});

		const firstId = webix.storage.local.get("selectedId") || contacts.getFirstId();

		if (firstId) {
			contactsList.select(firstId);
		}

		this.on(contacts.data, "onStoreUpdated", (id, obj, mode) => {

			if (mode === "add") {
				contactsList.select(id);
			}
			if (mode === "delete") {
				const firstId = contactsList.getFirstId();
				contactsList.select(firstId);
			}
		});
	}
}
