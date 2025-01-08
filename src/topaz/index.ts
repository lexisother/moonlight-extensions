import { ExtensionWebpackModule } from "@moonlight-mod/types";

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  storage: {
    entrypoint: true
  },
  index: {
    entrypoint: true,
    dependencies: [
      { ext: "topaz", id: "storage" },
      { ext: "spacepack", id: "spacepack" },
      { ext: "settings", id: "settings" },
      { id: "react" },
      { id: "discord/components/common/index" },
      { ext: "moonbase", id: "moonbase" },
      // TODO: figure out which of these can go
      { id: "discord/modules/guild_settings/IntegrationCard.css" },
      ".forumOrHome]:"
    ]
  }
};
