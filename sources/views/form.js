import { JetView } from "webix-jet";
import { statuses } from "../models/statuses";
import { countries } from "../models/countries";
import PopupView from "./windows/popup";
import { contacts } from "../models/contacts";

export default class FormView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        return {
            view: "form",
            localId: "contactForm",
            margin: 20,
            elements: [
                {
                    view: "text",
                    type: "text",
                    label: "Name",
                    name: "Name"
                },
                {
                    view: "text",
                    type: "email",
                    label: "Email",
                    name: "Email"
                },
                {
                    view: "combo",
                    label: "Status",
                    name: "Status",
                    options: {
                        body: {
                            template: "#Name#"
                        },
                        data: statuses
                    }
                },
                {
                    view: "combo",
                    label: "Country",
                    name: "Country",
                    options: {
                        body: {
                            template: "#Name#"
                        },
                        data: countries
                    }
                },
                {
                    cols: [
                        {
                            view: "button",
                            value: _("Save"),
                            css: "webix_primary",
                            click: () => {
                                const form = this.getRoot();
                                const formData = form.getValues();
                                if (!formData.id) {
                                    webix.message("Can not save the contact. Add the new one.")
                                } else if (form.isDirty()) {
                                    form.setDirty();
                                    contacts.updateItem(formData.id, formData)
                                    webix.message("Contact is updated.")
                                } else {
                                    webix.message("Contact hasn't been changed.");
                                }
                            }
                        },
                        {
                            view: "button",
                            value: _("Cancel"),
                            click: () => {
                                const form = this.getRoot();
                                if (form.isDirty()) {
                                    this._jetPopup.showWindow()
                                } else {
                                    webix.message("The form has not been changed. Nothing to reset.")
                                }

                            },
                        }
                    ]
                },
                {}
            ], css: "webix_shadow_medium app_start"
        };

    }

    init() {
        this._jetPopup = this.ui(PopupView);
    }

    urlChange(view, url) {
        const form = this.$$("contactForm");
        const id = url[0].params.id;

        if (id) {
            const contact = contacts.getItem(id);
            form.setValues(contact);
        } else {
            form.clear();
        }
    }

    ready() {
        const form = this.$$("contactForm");

        this.on(this.app, "onCancel", () => {
            const prevData = form.getCleanValues();
            form.setValues(prevData);
        });
    }
}