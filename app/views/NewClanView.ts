import { el, View } from "@common-module/app";
import Layout from "./Layout.js";

export default class NewClanView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(
      ".new-clan-view",
      el("header", el("h2", "Create a new clan")),
    );
  }
}
