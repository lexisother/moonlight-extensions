import { ExtensionWebpackModule } from "@moonlight-mod/types";

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  storage: {
    entrypoint: true
  },
  index: {
    entrypoint: true,
    dependencies: [
      // Core requirements
      { ext: "moonbase", id: "settings" },
      { ext: "spacepack", id: "spacepack" },
      { ext: "settings", id: "settings" },

      // Ours
      { ext: "topaz", id: "storage" },

      // Finds
      { id: "react" },
      { id: "discord/components/common/index" },
      // TODO: figure out which of these can go
      { id: "discord/modules/guild_settings/IntegrationCard.css" },
      ".forumOrHome]:"
    ]
  }
};
