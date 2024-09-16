import {JetView} from "webix-jet";
import { countries } from "../models/countries";
import { statuses } from "../models/statuses";

class CountriesTable extends JetView {
	config(){
		return { 
			view: "datatable",
			localId:'countriesId',
			id:"countriesView",
			select:true,
			autoConfig: true,
			editable: true,
			scrollX: false,
			columns:[
				{ id:"Name", header:"Countries",editor: "text",fillspace: true,template: function (obj) {
					return (
					  "<div class='space'>" +
					  obj.Name +
					  "<span class='removeBtn webix_icon wxi-trash'></span></div>"
					);
				  }     },
				
			],

			onClick: {
				removeBtn: function (ev, id) {
				  this.remove(id);
				  return false;
				},
			  }
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
			localId:'statusesId',
			id:'statusesView',
			select:true,
			autoConfig: true,
			editable: true,
			fillspace: true,
			scrollX: false,
			columns:[
				{ id:"Name", header:"Statuses",editor: "text",fillspace: true,template: function (obj) {
					return (
					  "<div class='space'>" +
					  obj.Name +
					  "<span class='removeBtn webix_icon wxi-trash'></span></div>"
					);
				  }     },
				
			],
			
			onClick: {
				removeBtn: function (ev, id) {
				  this.remove(id);
				  return false;
				},
			  }		
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
			{	cols: [
					{view:"tabbar", id: "tabs", css:"webix_shadow_medium", multiview:true, value:"countriesView",
						
							  options: [
								{ value:'Countries', id:'countriesView'},
            					{ value:'Statuses', id:'statusesView'},
							]  								
					},
					
					{view: "form", localId: "add-form", elements: [
						{
						  view: "text",
						  label: "Name",
						  name: "name",
						  invalidMessage: "Name must be filled in",
						},
						{view: "button",localId: "add-button", value:"Add new", inputWidth:100, click: () => {
							const form = this.$$("add-form");
							const isValid = form.validate();
							if(isValid) {
								this.addNew()
								form.clear()
								form.clearValidation()
							}							
						}
					},
						
					  ], 
					  rules: {
						name: webix.rules.isNotEmpty,
					  },}
				]},
				{id: "cells",animate: false,cells: [
					{id:"countriesView",$subview:CountriesTable, name:"countriesView"},
					{id:"statusesView",$subview:StatusesTable, name: "statusesView"},
				]},				
			]
		};	
			
	}
	 addNew (id, ev) {
		const formValues = this.$$("add-form").getValues();
		const cellId = this.$$("tabs").getValue()

		const currentTable = this.getRoot().queryView({view: "datatable", id: cellId}).add({"Name":formValues.name})
	}	
}