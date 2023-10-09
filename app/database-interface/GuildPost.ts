import Post from "./Post.js";

export default interface GuildPost extends Post {
  guild_id: number;
}
