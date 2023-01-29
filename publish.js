import { publish } from "gh-pages";
import { open } from "fs/promises";

open("dist/.nojekyll", "w").then(() => {
  publish("dist", { dotfiles: true });
});
