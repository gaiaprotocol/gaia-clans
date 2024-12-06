import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import {
  ClanEmblemsContract,
  ContractEventsProcessor,
  GaiaProtocolConfig,
} from "gaiaprotocol";
import ClanForm from "../forms/ClanForm.js";
import Layout from "./Layout.js";

export default class NewClanView extends View {
  private form: ClanForm;

  constructor() {
    super();
    Layout.content = this.container = el(
      ".new-clan-view",
      el("header", el("h2", "Create a new clan")),
      el("main", this.form = new ClanForm()),
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
    const data = this.form.data;

    if (!data.name) throw new Error("Clan name is required");

    const metadataHash = await GaiaProtocolConfig.supabaseConnector
      .callEdgeFunction<string>(
        "create-pending-clan-data",
        {
          name: data.name,
          logo_image_url: data.logo_image_url,
          logo_thumbnail_url: data.logo_thumbnail_url,
          description: data.description,
        },
      );

    const clanId = await ClanEmblemsContract.createClan(metadataHash);

    await ContractEventsProcessor.processEvents("ClanEmblems");

    Router.go(`/${clanId}`);
  }
}
