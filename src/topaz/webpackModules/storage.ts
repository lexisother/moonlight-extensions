import { Events, make } from "nests";
import type { Settings } from "@moonlight-mod/wp/topaz_storage";

const cached = moonlight.getConfigOption<Settings>("topaz", "settings");
const nest = make<Settings>(cached ?? { files: {}, name: "", enabled: false });

const save = () => {
  console.log(nest);
  moonlight.setConfigOption("topaz", "settings", { ...nest.ghost });
};

nest.on(Events.SET, save);
nest.on(Events.DELETE, save);

export default nest;
export { useNest } from "nests/react";
