import Settings from "@moonlight-mod/wp/settings_settings";
import React from "@moonlight-mod/wp/react";
import {
  FormDivider,
  FormTitle,
  TabBar
} from "@moonlight-mod/wp/discord/components/common/index";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";

const { Divider } = spacepack.findByCode(".forumOrHome]:")[0].exports.Z;

const ContainerClasses = spacepack.findByExports("upperContainer")[0].exports;
const HeaderClasses = spacepack.findByExports("title", "titleWrapper")[0]
  .exports;
const TabBarClasses1 = spacepack.findByExports("topPill")[0].exports;
const TabBarClasses2 = spacepack.findByCode("nowPlayingColumn:")[0].exports;

function TopazPage(): JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState("snippets");

  return (
    <div>
      <div
        className={ContainerClasses.upperContainer}
        style={{ marginBottom: "1rem" }}
      >
        <div className={HeaderClasses.titleWrapper}>
          {/* @ts-expect-error error in mappings */}
          <FormTitle tag="h1" style={{ marginBottom: "0px" }}>
            Topaz
          </FormTitle>
        </div>

        <Divider />

        <TabBar
          selectedItem={selectedTab}
          type={TabBarClasses1.topPill}
          className={`${TabBarClasses1.topPill} ${TabBarClasses2.tabBar}`}
          onItemSelect={(x: string) => {
            console.log("FUUUUUUUUUCK", x);
            setSelectedTab(x);
          }}
        >
          <TabBar.Item
            id="snippets"
            className={`${TabBarClasses1.themed} ${TabBarClasses2.item}`}
          >
            Snippets
          </TabBar.Item>
          <TabBar.Item
            id="settings"
            className={`${TabBarClasses1.themed} ${TabBarClasses2.item}`}
          >
            Settings
          </TabBar.Item>
        </TabBar>
      </div>

      {selectedTab == "snippets" && <div>snippets</div>}
      {selectedTab == "settings" && <div>settings</div>}
    </div>
  );
}

Settings.addHeader("Topaz", null);
Settings.addSection("topaz", "Topaz", TopazPage);
Settings.addDivider(null);

console.log("FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
