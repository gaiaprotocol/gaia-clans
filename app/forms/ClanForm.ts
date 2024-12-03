import { DomNode } from "@common-module/app";
import ClanLogoInput from "./ClanLogoInput.js";

export default class ClanForm extends DomNode {
  constructor() {
    super(".clan-form");
    this.append(
      new ClanLogoInput({}),
    );
  }
}
