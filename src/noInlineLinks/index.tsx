import { Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: /allowLinks:.{1,2},/,
    replace: {
      match: /allowLinks:.{1,2},/,
      replacement: () => "allowLinks:false,"
    }
  }
];
