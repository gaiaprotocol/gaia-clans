import { el, View } from "@common-module/app";
import { ClanRepository } from "gaiaprotocol";
import Layout from "./Layout.js";

export default class ClanInfoView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(
      ".clan-info-view",
    );
  }

  public async changeData(data: { clanId: string }) {
    const clan = await ClanRepository.fetchById(parseInt(data.clanId, 10));

    this.container.append(
      JSON.stringify(clan, null, 2),
    );
  }
}
