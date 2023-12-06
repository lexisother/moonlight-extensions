import { ExtensionWebpackModule } from "@moonlight-mod/types";

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  entrypoint: {
    entrypoint: true,
    run: (module, exports, require) => {
      // The types here are quire literally just baloney to make TS happy.
      // I sure hope the code I changed doesn't impact functionality though...
      const optimize = (orig: typeof Element.prototype.removeChild) =>
        function <T extends Element>(this: typeof Element, args: T) {
          if (
            typeof args.className === "string" &&
            args.className.indexOf("activity") !== -1
          )
            return setTimeout(() => orig.apply(this, [args]), 100);

          return orig.apply(this, [args]);
        };
      Element.prototype.removeChild = optimize(
        Element.prototype.removeChild
      ) as unknown as typeof Element.prototype.removeChild;
    }
  }
};
