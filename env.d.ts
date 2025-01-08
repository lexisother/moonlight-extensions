/// <reference types="@moonlight-mod/types" />

declare module "@moonlight-mod/wp/topaz_storage" {
  import _nests from "nests";

  export interface Settings {
    enabled: boolean;
    name: string;
    files: Record<
      string,
      {
        mode: string;
        enabled: boolean;
        value: string;
      }
    >;
  }

  export { useNest } from "nests/react";
  export default nest as _nests.Nest<Settings>;
}
