import { JetView } from "webix-jet";

export default class PopupView extends JetView {

    config() {
        const _ = this.app.getService("locale")._;

        return {
            view: "window",
            head: _("Reset the form ?"),
            modal: true,
            width: 300,
            height: 400,
            position: "center",
            body: {
                cols: [
                    {
                        view: "button",
                        label: _("Cancel"),
                        width: 100, click: () => {
                            this.hideWindow();
                        }
                    },
                    {
                        view: "button",
                        css: "webix_primary",
                        label: _("Reset"),
                        width: 100, click: () => {
                            this.app.callEvent("onCancel");
                            this.hideWindow();
                            webix.message("The form is reset.");
                        }
                    }
                ]
            }
        };
    }
    showWindow() {
        this.getRoot().show();
    }

    hideWindow() {
        this.getRoot().hide();
    }
}
