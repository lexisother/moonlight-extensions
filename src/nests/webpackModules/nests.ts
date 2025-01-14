import { Events, Nest, make } from "nests";

export function makeNest<T>(
  pluginId: string,
  defaultValue: T,
  customSave?: () => void
): Nest<T> {
  const cached = moonlight.getConfigOption<T>(pluginId, "settings");
  const nest = make<T>(cached ?? defaultValue);

  const save = (): void => {
    moonlight.setConfigOption(pluginId, "settings", { ...nest.ghost });
  };

  nest.on(Events.SET, customSave ?? save);
  nest.on(Events.DELETE, customSave ?? save);

  moonlight.getLogger("nests").info(`Created nest for ${pluginId}`, nest);

  return nest;
}

export { useNest } from "nests/react";
