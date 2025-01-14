import { makeNest } from "@moonlight-mod/wp/nests_nests";
import { Settings } from "@moonlight-mod/wp/topaz_storage";

const nest = makeNest<Settings>("topaz", {
  files: {},
  name: "",
  enabled: false
});

export default nest;
