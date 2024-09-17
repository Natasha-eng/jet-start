import { JetView } from "webix-jet";

export default class BaseTable extends JetView {
    constructor(app, config) {
        super(app);
        this.grid_config = config;
    }
    config() {
        return {
            type:"form",
            rows: [
                {
                    view: "datatable",
                    localId: "table",
                    height: 500,
                    columns: this.grid_config.columns,
                    select: true,
                    editable: true,
                    scrollX: false,
                    onClick: {
                        removeBtn: function (ev, id) {
                            this.remove(id);
                            return false;
                        },
                    }
                },
                {
                    view: "button",
                    value: this.grid_config.buttonValue, 
                    css: "webix_primary",
                    inputWidth: 150,
                    click: () => {
                        this.$$("table").add({ "Name": "" })
                    }
                },
                {}
                
            ]
        };
    }
}