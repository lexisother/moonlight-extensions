import * as Components from "@moonlight-mod/wp/discord/components/common/index";
import React from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import nest from "@moonlight-mod/wp/topaz_storage";
import { useNest } from "@moonlight-mod/wp/nests_nests";
import { TopazNatives } from "../../types";

const AceEditor =
  (moonlight.getNatives("topaz") as TopazNatives).loadAce()?.default ||
  // @ts-ignore
  window.ReactAce?.default;

type E = React.ComponentType<any>;
const {
  FormSection,
  FormSwitch: SwitchItem,
  FormText,
  SingleSelect,
  Switch,
  TabBar,
  Tooltip
} = Components;
const { PlusLargeIcon, TrashIcon } = Components as Record<string, E>;
const PanelButton = spacepack.findByCode("Masks.PANEL_BUTTON")[0].exports.Z;

const ScrollerClasses = spacepack.findByExports("auto", "thin")[0].exports;
const TooltipClasses = spacepack.findByExports("tooltipBottom")[0].exports;
const TabBarClasses = spacepack.findByCode("nowPlayingColumn:")[0].exports;
const Margins = spacepack.require("discord/styles/shared/Margins.css");

let ignoreNextSelect = false;
export default function SnippetsPage(): React.JSX.Element {
  console.log(AceEditor);
  const settings = useNest(nest);

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [openFile, setOpenFile] = React.useState(
    Object.keys(settings.files)[0]
  ); // you love?

  return (
    <div className="topaz-snippets">
      <div className="topaz-editor">
        <TabBar
          selectedItem={openFile}
          className={`${TabBarClasses.tabBar} ${ScrollerClasses.auto}`}
          type="side"
          look="1"
          onItemSelect={(x: string) => {
            if (x.startsWith("#")) return;
            // biome-ignore lint/suspicious/noAssignInExpressions: shut up
            if (ignoreNextSelect) return (ignoreNextSelect = false);

            setOpenFile(x);
          }}
        >
          {Object.keys(settings.files).map((x) => (
            <TabBar.Item
              id={x}
              aria-label={x}
              className={TabBarClasses.item}
              key={x}
            >
              <input
                type="text"
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
                value={x}
                id={`inptab-${x.replace(/[^A-Za-z0-9]/g, "_")}`}
                style={{ width: x.length * 0.8 + "ch" }}
                onChange={(e) => {
                  let val = e.target.value;

                  if (!document.querySelector(".topaz-snippets"))
                    (document.querySelector(
                      "#inptab-" + x.replace(/[^A-Za-z0-9]/g, "_")
                    ) as HTMLInputElement)!.style.width =
                      val.length * 0.8 + "ch";

                  nest.store.files[val] = nest.ghost.files[x];
                  delete nest.store.files[x];

                  if (openFile === x) setOpenFile(val);

                  setTimeout(
                    () =>
                      (document.querySelector(
                        "#inptab-" + val.replace(/[^A-Za-z0-9]/g, "_")
                      ) as HTMLInputElement)!.focus(),
                    20
                  );
                }}
              />
              <Switch
                checked={nest.ghost.files[x].enabled}
                onChange={(_) =>
                  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                  (nest.store.files[x].enabled = !nest.ghost.files[x].enabled)
                }
              />
              <PanelButton
                icon={TrashIcon}
                tooltipText="Delete"
                onClick={() => {
                  ignoreNextSelect = true;

                  const originalIndex = Object.keys(nest.ghost.files).indexOf(
                    openFile
                  );

                  delete nest.store.files[x];

                  if (openFile === x) {
                    let newOpenIndex = originalIndex - 1;
                    if (newOpenIndex < 0) newOpenIndex = 0;

                    setOpenFile(
                      Object.keys(nest.ghost.files)[newOpenIndex] ?? ""
                    );
                  } else forceUpdate();
                }}
              />
            </TabBar.Item>
          ))}
          <TabBar.Item
            id="#new"
            aria-label="New"
            className={TabBarClasses.item}
          >
            <PanelButton
              icon={PlusLargeIcon}
              tooltipNext="New"
              tooltipClassName={`${TooltipClasses.tooltipBottom} topaz-snippets-tooltip-bottom`}
              onClick={() => {
                const name = "";

                nest.store.files[name] = {
                  enabled: true,
                  mode: "css",
                  value: ""
                };
                if (openFile === name) forceUpdate();
                else setOpenFile(name);
              }}
            />
          </TabBar.Item>
        </TabBar>

        {nest.ghost.files[openFile] === undefined ? (
          <section className="topaz-editor-no-files">
            <div>You have no snippets.</div>
            <div>
              Make a snippet with the <PlusLargeIcon width={20} height={20} />{" "}
              icon in the sidebar.
            </div>
          </section>
        ) : (
          <>
            {AceEditor ? (
              <AceEditor
                mode={nest.ghost.files[openFile].mode}
                theme="tomorrow_night"
                name="topaz-editor"
                value={nest.ghost.files[openFile].value}
                setOptions={{ useWorker: false }}
                onChange={(value: string) => {
                  nest.store.files[openFile].value = value;
                }}
                width="75%"
                height="75vh"
              />
            ) : (
              <FormSection tag="h1">AceEditor failed to load.</FormSection>
            )}
          </>
        )}
      </div>
    </div>
  );
}
