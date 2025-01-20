import { Router, SPAInitializer } from "@common-module/app";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import ClanInfoView from "./views/ClanInfoView.js";
import Layout from "./views/Layout.js";
import NewClanView from "./views/NewClanView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();

  Router
    .add("/*", Layout)
    .add("/new-clan", NewClanView)
    .add("/:clanId", ClanInfoView, ["/new-clan"]);
}
