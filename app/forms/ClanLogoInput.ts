import { DomNode, el, ImageOptimizer } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  InvisibleFileInput,
} from "@common-module/app-components";
import { DeleteIcon } from "@gaiaprotocol/svg-icons";
import { GaiaProtocolConfig } from "gaiaprotocol";

interface LogoData {
  logoImageUrl?: string;
  logoThumbnailUrl?: string;
}

export default class ClanLogoInput extends DomNode<HTMLDivElement, {
  dataChanged: (data: LogoData) => void;
}> {
  private invisibleFileInput: InvisibleFileInput;
  private logoDisplay: DomNode;

  constructor(private data: LogoData) {
    super(".clan-logo-input");
    this.append(
      this.invisibleFileInput = new InvisibleFileInput({
        accept: "image/*",
        onChange: (files) => {
          if (files.length > 0) this.uploadLogoImage(files[0]);
        },
      }),
      this.logoDisplay = el(".logo-display", {
        style: { backgroundImage: `url(${this.data.logoImageUrl})` },
        onclick: () => this.invisibleFileInput.openFileSelector(),
      }),
      new Button(".clear", {
        type: ButtonType.Circle,
        icon: new DeleteIcon(),
        onClick: () => this.clearLogo(),
      }),
    );
  }

  private async optimizeAndUploadImage(file: File, maxSize: number) {
    const optimized = await ImageOptimizer.optimizeImage(
      file,
      maxSize,
      maxSize,
    );

    const formData = new FormData();
    formData.append("file", optimized);

    const filePath = await GaiaProtocolConfig.supabaseConnector
      .callEdgeFunction(
        "upload-clan-logo",
        formData,
      );

    return `https://storage.googleapis.com/gaiaprotocol/${filePath}`;
  }

  private async uploadLogoImage(file: File) {
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);

    const [optimizedImageUrl, thumbnailImageUrl] = await Promise.all([
      this.optimizeAndUploadImage(file, 1024),
      this.optimizeAndUploadImage(file, 120),
    ]);

    this.data = {
      logoImageUrl: optimizedImageUrl,
      logoThumbnailUrl: thumbnailImageUrl,
    };

    this.emit("dataChanged", this.data);

    this.logoDisplay.style({ backgroundImage: `url(${optimizedImageUrl})` });

    loadingSpinner.remove();
  }

  private clearLogo() {
    this.data = {};
    this.emit("dataChanged", this.data);
    this.logoDisplay.style({ backgroundImage: "" });
  }
}
