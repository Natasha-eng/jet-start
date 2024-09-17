import { JetView } from "webix-jet";
import StatusesView from "./statuses";
import CountriesView from "./countries";

export default class DataView extends JetView {
	config() {

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
								{ value: "Countries", id: "countriesView" },
								{ value: "Statuses", id: "statusesView" },
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