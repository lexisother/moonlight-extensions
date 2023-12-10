import { Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: 'ChannelItemIcon:',
    replace: {
      match: /(?<=useChannelEmojiAndColor\)\(.+?\),.+?=).+?null/, // ty rosalie
      replacement: 'null',
    }
  }
];
