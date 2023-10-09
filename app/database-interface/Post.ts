import { I18NText } from "common-dapp-module";
import { UploadedFile } from "./Rich.js";

export enum Target {
  EVERYONE,
  KEY_HOLDERS,
}

export default interface Post {
  id: number;
  target: Target;
  author: string;
  author_name: string;
  author_avatar_url?: string;
  message: string;
  translated?: I18NText;
  rich?: {
    files?: UploadedFile[];
  };
  created_at: string;
  updated_at?: string;
}
