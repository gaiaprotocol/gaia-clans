import { DomNode } from "@common-module/app";
import { LogoInput } from "gaiaprotocol";

export default class ClanForm extends DomNode {
  constructor() {
    super(".clan-form");
    this.append(
      new LogoInput({ functionName: "upload-clan-logo" }, {}),
    );
  }
}
