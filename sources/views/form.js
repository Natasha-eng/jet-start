import { JetView } from "webix-jet";
import { statuses } from "../models/statuses";
import { countries } from "../models/countries";
import PopupView from "./windows/popup";

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
                            click: function () {
                                const formData = this.$scope.getRoot().getValues();
                                this.$scope.app.callEvent("onDataEditStop", [formData]);
                            }
                        },
                        {
                            view: "button",
                            value: _("Cancel"),
                            click: function () {
                                this.$scope._jetPopup.showWindow()

                                // this.$scope.app.callEvent("onCancel");
                                // webix.message("Confirmed");
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

    urlChange() {
        const form = this.$$("contactForm");

        this.on(this.app, "onAfterSelect", (data) => {
            form.setValues(data);
            form.prevData = form.getValues();
        });
    }

    ready() {
        const form = this.$$("contactForm");

        this.on(this.app, "onCancel", () => {
            const preDvata = form.prevData;
            if (preDvata) form.setValues(preDvata);
        });


        this.on(this.app, "onItemClick", (data) => {
            if (data) form.setValues(data);
        });
    }
} 