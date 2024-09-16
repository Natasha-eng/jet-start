import { JetView } from "webix-jet";

export default class BaseTable extends JetView {
    constructor(app, config) {
        super(app);
        this.grid_config = config;
    }
    config() {
        return {
            rows: [
                {
                    view: "datatable",
                    localId: this.grid_config.tableLocalId,
                    columns: this.grid_config.columns,
                    select: true,
                    autoConfig: true,
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
                    fillspace: true,
                    css: "backgorund-white",
                    rows: [
                        {
                            view: "button", localId: this.grid_config.buttonLocalId, value: this.grid_config.buttonValue, css: "webix_primary",
                            inputWidth: 150, click: () => {
                                const table = this.$$(this.grid_config.tableLocalId);
                                table.add({ "Name": "" })
                            }
                        },

                    ]
                },
                {css: "backgorund-white"}
            ]
        };
    }
}