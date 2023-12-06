import { Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  // {
  //   find: /iconEmoji/,
  //   replace: {
  //     match: /return{iconEmoji:(.*?)}/,
  //     replacement: (_) => `return{iconEmoji:null}`,
  //   },
  // },
  // {
  //   find: /\.emojiColorFill/,
  //   replace: {
  //     match: /className:.{1,2}\(\)\.emojiColorFill/,
  //     replacement: (_) => `className:''`,
  //   },
  // },
  {
    find: /useChannelEmojiAndColor:/,
    replace: {
      match: /return{emoji:(.*?),color:(.*?)}/g,
      replacement: () => `return{emoji:null,color:null}`
    }
  }
];
