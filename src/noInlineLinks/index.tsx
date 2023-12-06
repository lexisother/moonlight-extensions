import { Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: /childrenExecutedCommand:/,
    replace: {
      match: /allowLinks:.{1,2}\.showMaskedLinks\|\|.{1,2}\.showMaskedLinks/g,
      replacement: () => "allowLinks:false"
    }
  }
];
