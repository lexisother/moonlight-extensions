import { ExtensionWebpackModule } from "@moonlight-mod/types";

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  index: {
    entrypoint: true,
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "settings", id: "settings" },
      { id: "react" },
      { id: "discord/components/common/index" },
      { ext: "moonbase", id: "moonbase" },
      // TODO: figure out which of these can go
      { id: "discord/modules/guild_settings/IntegrationCard.css" },
      "Masks.PANEL_BUTTON",
      '"Missing channel in Channel.openChannelContextMenu"',
      ".forumOrHome]:"
    ]
  }
};
