import { statuses } from "../models/statuses";
import BaseTable from "./baseTable";

export default class StatusesView extends BaseTable {
    constructor(app){
        super(app, {
            tableLocalId: "statusesId",
            columns:[
				{ id:"Name", header:"Statuses", editor: "text",fillspace: true,template: function (obj) {
					return  (
                        "<div class='space'> <div>" + obj.Name + "</div> " +
                        "<span class='removeBtn webix_icon wxi-trash'></span></div>"
                      );
				  }    
                 },	
                
			],   
            buttonLocalId: "status-add-button",
            buttonValue: "Add new status"        
        });
    }
    init(){
		this.$$("statusesId").parse(statuses);
	}
}