import { JetView } from "webix-jet";

export default class FormView extends JetView {
	config() {
		return {
			view: "form",
			localId: "contactForm",
			margin: 20,
			elements: [
				{ view: "text", type: "text", label: "Name", name: "Name" },
				{ view: "text", type: "email", label: "Email", name: "Email" },
				{ view: "text", type: "text", label: "Status", name: "Status" },
				{ view: "text", type: "text", label: "Country", name: "Country" },
				{
					cols: [
						{ view: "button", value: "Save", css: "webix_primary" },
						{ view: "button", value: "Cancel" }
					]
				},
				{}
			], css: "webix_shadow_medium app_start"
		};

	}


	urlChange () {
	    this.on(this.app, "onAfterSelect", (data) => {
	    console.log("form item", data);
	    this.$$("contactForm").setValues(data);
	    });
	}
} 