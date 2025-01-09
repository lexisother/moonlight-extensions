import Settings from "@moonlight-mod/wp/settings_settings";
import React from "@moonlight-mod/wp/react";
import {
  Text,
  TabBar
} from "@moonlight-mod/wp/discord/components/common/index";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { UserSettingsModalStore } from "@moonlight-mod/wp/common_stores";
import { useStateFromStores } from "@moonlight-mod/wp/discord/packages/flux";
import Moonbase from "@moonlight-mod/wp/moonbase_moonbase";

import SnippetsPage from "./pages/snippets";
import SettingsPage from "./pages/settings";

// functions
const { setSection, clearSubsection } = spacepack.findByExports(
  "setSection",
  "clearSubsection"
)[0].exports.Z;

// components
const { Divider } = spacepack.findByCode(".forumOrHome]:")[0].exports.Z;

// classes
const Margins = spacepack.require("discord/styles/shared/Margins.css");
const TitleBarClasses = spacepack.findByCode("iconWrapper:", "children:")[0]
  .exports;
const TabBarClasses = spacepack.findByCode("nowPlayingColumn:")[0].exports;

export const pages: {
  id: string;
  name: string;
  element: React.FunctionComponent;
}[] = [
  {
    id: "snippets",
    name: "Snippets",
    element: SnippetsPage
  },
  {
    id: "settings",
    name: "Settings",
    element: SettingsPage
  }
];

function TopazPage(): React.JSX.Element {
  const subsection = useStateFromStores(
    [UserSettingsModalStore],
    () => UserSettingsModalStore.getSubsection() ?? 0
  );
  const setSubsection = React.useCallback(
    (to: string) => {
      if (subsection !== to) setSection("topaz", to);
    },
    [subsection]
  );

  React.useEffect(
    () => () => {
      clearSubsection("topaz");
    },
    []
  );

  return (
    <>
      <div className={`${TitleBarClasses.children} ${Margins.marginBottom20}`}>
        <Text
          className={TitleBarClasses.titleWrapper}
          variant="heading-lg/semibold"
          tag="h2"
        >
          Topaz
        </Text>
        <Divider />
        <TabBar
          selectedItem={subsection}
          onItemSelect={setSubsection}
          type="top-pill"
          className={TabBarClasses.tabBar}
        >
          {pages.map((page, i) => (
            <TabBar.Item key={page.id} id={i} className={TabBarClasses.item}>
              {page.name}
            </TabBar.Item>
          ))}
        </TabBar>
      </div>

      {React.createElement(pages[subsection].element)}
    </>
  );
}

Settings.addHeader("Topaz", null);
Settings.addSection("topaz", "Topaz", TopazPage);
Settings.addDivider(null);

// Remove the warning about a lacking custom component
Moonbase.registerConfigComponent("topaz", "settings", () => <></>);
