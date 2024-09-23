import { saveStatuses } from "../models/records";
import { statuses } from "../models/statuses";
import BaseTable from "./baseTable";

export default class StatusesView extends BaseTable {
    constructor(app) {
        super(app, {
            collection: statuses,
            save: saveStatuses,
            columns: [
                {
                    id: "Name",
                    header: "Statuses",
                    editor: "text",
                    fillspace: true,
                    template: function (obj) {
                        return (
                            "<div class='space'> <div>" + obj.Name + "</div> " +
                            "<span class='removeBtn webix_icon wxi-trash'></span></div>"
                        );
                    }
                },

            ],
            buttonValue: "Add new status"
        });
    }
    init() {

        this.$$("table").parse(statuses);
    }
}