import { el, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import ClanForm from "../forms/ClanForm.js";
import Layout from "./Layout.js";

export default class NewClanView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(
      ".new-clan-view",
      el("header", el("h2", "Create a new clan")),
      el("main", new ClanForm()),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Create clan",
          onClick: () => this.createClan(),
        }),
      ),
    );
  }

  private async createClan(): Promise<void> {
  }
}
