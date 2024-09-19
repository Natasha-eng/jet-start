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
                                const formData = this.getRoot().getValues();
                                contacts.updateItem(formData.id, formData)
                                this.getRoot().prevData = formData;
                            }
                        },
                        {
                            view: "button",
                            value: _("Cancel"),
                            click: () => {
                                this._jetPopup.showWindow()
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
            form.prevData = form.getValues();
        } else {
            form.clear();
        }
    }

    ready() {
        const form = this.$$("contactForm");

        this.on(this.app, "onCancel", () => {
            const preDvata = form.prevData;
            if (preDvata) form.setValues(preDvata);
        });
    }
}