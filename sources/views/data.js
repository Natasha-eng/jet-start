import {JetView} from "webix-jet";
import { countries } from "../models/countries";
import { statuses } from "../models/statuses";

class CountriesTable extends JetView {
	config(){
		return { 
			view: "datatable",
			localId: "countriesId",
			select:true,
			autoConfig: true,
		};
	}
	init(){
		this.$$("countriesId").parse(countries);
	}

}

class StatusesTable extends JetView {
	config(){
		return { 
			view: "datatable",
			localId: "statusesId",
			select:true,
			autoConfig: true,			
		};
	}
	init(){
		this.$$("statusesId").parse(statuses);
	}

}
export default class DataView extends JetView{
	config(){
		return { 
			rows: [
				{view:"tabview", css:"webix_shadow_medium", 
					cells: [
						{header:"Countries",  body: CountriesTable },
						{header:"Statuses",  body: StatusesTable},					
					] 
				},
			
			]
		};			
	}
}