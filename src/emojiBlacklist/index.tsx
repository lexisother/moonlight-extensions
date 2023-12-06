import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

interface Emoji {
  id: string;
}

export const patches: Patch[] = [
  {
    find: /searchWithoutFetchingLatest\(.{1,2}\)/,
    replace: {
      match: /(return{unlocked:this\.getSearchResultsOrder\()(.{1,2}?)/,
      replacement: (_, orig, container) =>
        `${container}.unlocked=__hh2_require("emojiBlacklist_filterEmojis").default(${container}.unlocked);${orig}${container}`
    }
  }
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  filterEmojis: {
    entrypoint: false,
    run: (module) => {
      module.exports.default = function (emojiList: Emoji[]) {
        const emojis =
          moonlight.getConfigOption<string[]>("emojiBlacklist", "emojis") ?? [];
        emojiList = emojiList.filter((e) => !emojis.includes(e.id));
        return emojiList;
      };
    }
  }
};
