import { JetView } from "webix-jet";
import { statuses } from "../models/statuses";
import { countries } from "../models/countries";

export default class FormView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        return {
            view: "form",
            localId: "contactForm",
            margin: 20,
            elements: [
                { view: "text", type: "text", label: "Name", name: "Name" },
                { view: "text", type: "email", label: "Email", name: "Email" },
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
                                const form = this.$scope.getRoot();
                                form.clear();
                                webix.message("Confirmed");
                            },
                        }
                    ]
                },
                {}
            ], css: "webix_shadow_medium app_start"
        };

    }

    urlChange() {

        this.on(this.app, "onAfterSelect", (data) => {
            this.$$("contactForm").setValues(data);
        });
    }

    ready() {
        this.on(this.app, "onItemClick", (data) => {
            if (data) this.$$("contactForm").setValues(data);
        });
    }
} 