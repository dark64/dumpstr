var ghpages = require("gh-pages");
var fs = require("fs");

fs.openSync("dist/.nojekyll", "w");
ghpages.publish("dist", { dotfiles: true });
