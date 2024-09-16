import { countries } from "../models/countries";
import BaseTable from "./baseTable";

export default class CountriesView extends BaseTable {
    constructor(app){
        super(app, {
            tableLocalId:'countriesId',
            columns:[
				{ id:"Name", header:"Countries",editor: "text",fillspace: true,template: function (obj) {
					return (
					  "<div class='space'> <div>" + obj.Name + "</div> " +
					  "<span class='removeBtn webix_icon wxi-trash'></span></div>"
					);
				  }     
                },				
			],
            buttonLocalId: "countryadd-button",
            buttonValue: "Add new country"
        });
    }
    init(){
		this.$$("countriesId").parse(countries);
	}
}