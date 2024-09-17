import { JetView } from "webix-jet";

export default class FormView extends JetView {
    config() {
        return {
            view: "form",
            localId: "contactForm",
            margin: 20,
            elements: [
                { view: "text", label: "Name" },
                { view: "text", type: "email", label: "Email" },
                { view: "text", type: "text", label: "Status" },
                { view: "text", type: "text", label: "Country" },
                {
                    cols: [
                        { view: "button", value: "Save", css: "webix_primary" },
                        { view: "button", value: "Cancel" }
                    ]
                },
                {}
            ], css: "webix_shadow_medium app_start"
        }

    }

    init() {
        this.on(this.app, "onAfterSelect", (data) => {
            console.log('form item', data)
            this.$$("contactForm").setValues(data);
        });

    }

    // ready() {
    //     this.on(this.app, "onAfterSelect", (data) => {
    //         console.log('form item', data)
    //         this.$$("contactForm").setValues(data);
    //     });
    // }

    // urlChange () {
    //     this.on(this.app, "onAfterSelect", (data) => {
    //         console.log('form item', data)
    //         this.$$("contactForm").setValues(data);
    //     });
    // }
} 