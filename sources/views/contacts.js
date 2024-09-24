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
									`<div class='space'> <div>${obj.Name || ""}  ${obj.Email || ""}  </div> 
									<span class='removeBtn webix_icon wxi-trash'></span></div>`
								);
							},
							css: "webix_shadow_medium app_start",

							onClick: {
								removeBtn: function (ev, id) {
									contacts.waitSave(() => {
										contacts.remove(id);
										return false;
									}).then(() => {
										const firstId = contacts.getFirstId();
										this.select(firstId)
									})

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
									"Status": 4,
									"Country": 5
								};

								contacts.waitSave(() => {
									contacts.add(newContact);
								}).then((data) => {
									this.contactsList.select(data.id)
								});
							}
						},
					]
				},
				FormView,
			],
		};
	}

	init() {
		this.contactsList = this.$$("contactsList");

		this.contactsList.parse(contacts);

		this.on(this.contactsList, "onSelectChange", (id) => {
			if (!id[0]) {
				this.setParam("id", null, true);
				webix.storage.local.remove("selectedId");
			} else {
				this.setParam("id", id[0], true);
				webix.storage.local.put("selectedId", id);
			}
		});

		contacts.waitData.then(() => {
			const firstId = webix.storage.local.get("selectedId") || contacts.getFirstId();
			if (firstId)
				this.contactsList.select(firstId);
		})
	}
}
