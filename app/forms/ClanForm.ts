import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { LogoInput } from "gaiaprotocol";
import ClanEntity from "gaiaprotocol/lib/clan/ClanEntity.js";

export default class ClanForm extends DomNode<HTMLDivElement, {
  dataChanged: (data: ClanEntity) => void;
}> {
  public data: ClanEntity;

  constructor(data?: ClanEntity) {
    super(".clan-form");

    data ? this.data = data : this.data = {};

    this.append(
      new LogoInput({
        functionName: "upload-clan-logo",
        onChange: (newLogo) => {
          this.data.logo_image_url = newLogo.logoImageUrl;
          this.data.logo_thumbnail_url = newLogo.logoThumbnailUrl;
          this.emit("dataChanged", this.data);
        },
      }, {
        logoImageUrl: this.data.logo_image_url,
        logoThumbnailUrl: this.data.logo_thumbnail_url,
      }),
      el(
        ".name-input-container",
        new Input({
          label: "Name",
          placeholder: "Enter clan name",
          value: this.data.name,
          onChange: (newValue) => {
            this.data.name = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".description-input-container",
        new Input({
          multiline: true,
          label: "Description",
          placeholder: "Enter clan description",
          value: this.data.description,
          onChange: (newValue) => {
            this.data.description = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
    );
  }
}
