import { BodyNode, DomNode, el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { AddIcon } from "@gaiaprotocol/svg-icons";
import ClanTechLogo from "../ClanTechLogo.js";

export default class Layout extends View {
  private static current: Layout;

  public static set content(content: DomNode) {
    Layout.current.contentContainer.append(content);
  }

  private contentContainer: DomNode;

  constructor() {
    super();
    Layout.current = this;

    this.container = el(
      ".layout",
      el(
        "header",
        new ClanTechLogo(),
        el(
          ".button-container",
          new LoggedInUserAvatarButton(WalletLoginManager),
        ),
      ),
      this.contentContainer = el("main"),
      el(
        ".clan-list-container",
        el(
          "footer",
          new Button({
            type: ButtonType.Contained,
            icon: new AddIcon(),
            title: "Create Clan",
            onClick: () => Router.go("/new-clan"),
          }),
        ),
      ),
    ).appendTo(BodyNode);
  }
}
