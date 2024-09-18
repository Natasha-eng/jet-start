import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import FormView from "./form";

export default class Contacts extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "wide",
			cols: [
				{
					type: "form",
					rows: [
						{
							view: "list",
							localId: "contactsList",
							scrollX: false,
							select: true,
							height: 300,
							template: function (obj) {

								return (
									"<div class='space'> <div>" + obj.Name + "  " + obj.Email + "</div> " +
									"<span class='removeBtn webix_icon wxi-trash'></span></div>"
								);
							},
							css: "webix_shadow_medium app_start",
							click: function (id) {
								this.$scope.setParam("id", id, true);
								const selectedItem = this.getItem(id);
								this.$scope.app.callEvent("onAfterSelect", [selectedItem]);
							},
							onClick: {
								removeBtn: function (ev, id) {
									this.remove(id);
									return false;
								},
							}
						},
						{
							view: "button",
							value: _("Add new contact"),
							css: "webix_primary",
							inputWidth: 250,
							click: (id) => {

								const newContact = {
									"Name": "",
									"Email": "",
									"Status": 1,
									"Country": 1
								};
								this.app.callEvent("onItemClick", [newContact]);
							}
						},
						{}
					]
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

	urlChange() {
		const id = this.getParam("id");
		const selectedItem = this.$$("contactsList").getItem(id);
		this.app.callEvent("onAfterSelect", [selectedItem]);

	}

	ready() {
		const contactsList = this.$$("contactsList");

		this.on(this.app, "onDataEditStop", (data) => {
			console.log('ready update list save', data)
			console.log('ready update list id save', data.id)
			contactsList.updateItem(data.id, data);
		});


		this.on(this.app, "onItemClick", (data) => {
			console.log('ready', data)
			if (data) contactsList.add(data);
			const lastId = contactsList.getLastId();
			contactsList.select(lastId);
			this.setParam("id", lastId, true);
			console.log('ad new', contactsList)
		});
	}
}
