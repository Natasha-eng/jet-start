import { JetView } from "webix-jet";
import StatusesView from "./statuses";
import CountriesView from "./countries";

export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{
					cols: [
						{
							view: "tabbar",
							css: "webix_shadow_medium",
							multiview: true,
							value: "countriesView",
							options: [
								{ value: _("Countries"), id: "countriesView" },
								{ value: _("Statuses"), id: "statusesView" },
							]
						},
					]
				},
				{
					animate: false,
					cells: [
						{ id: "countriesView", $subview: CountriesView },
						{ id: "statusesView", $subview: StatusesView },
					]
				},
			]
		};

	}
}