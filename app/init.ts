import { Router, SPAInitializer } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import ClanInfoView from "./views/ClanInfoView.js";
import Layout from "./views/Layout.js";
import NewClanView from "./views/NewClanView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();
  WalletLoginManager.init();

  Router
    .add("/*", Layout)
    .add("/new-clan", NewClanView)
    .add("/:clanId", ClanInfoView, ["/new-clan"]);
}
