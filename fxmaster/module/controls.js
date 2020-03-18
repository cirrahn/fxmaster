import { filterManager } from "../filters/FilterManager.js";
import { EffectsConfig } from "./config.js";
import { ColorizeConfig } from "./config.js";

Hooks.on("getSceneControlButtons", controls => {
  if (game.user.isGM) {
    controls.push({
      name: "effects",
      title: "CONTROLS.Effects",
      icon: "fas fa-magic",
      layer: "FXMasterLayer",
      tools: [
        {
          name: "weather",
          title: "CONTROLS.Weather",
          icon: "fas fa-cloud-rain",
          onClick: () => {
            new EffectsConfig().render(true);
          },
          button: true
        },
        {
          name: "colorize",
          title: "CONTROLS.Colorize",
          icon: "fas fa-palette",
          onClick: () => {
            new ColorizeConfig().render(true);
          },
          button: true
        },
        {
          name: "underwater",
          title: "CONTROLS.Underwater",
          icon: "fas fa-water",
          onClick: () => {
            filterManager.switch("core_underwater", "underwater", null, {});
          },
          button: true
        },
        {
          name: "explosion",
          title: "CONTROLS.explosion",
          icon: "fas fa-fire"
        },
        {
          name: "faery",
          title: "CONTROLS.faery",
          icon: "fas fa-leaf"
        },
        {
          name: "clearfx",
          title: "CONTROLS.ClearFX",
          icon: "fas fa-trash",
          onClick: () => {
            Dialog.confirm({
              title: game.i18n.localize("FXMASTER.Delete"),
              content: game.i18n.localize("FXMASTER.DeleteConfirm"),
              yes: () => {
                filterManager.removeAll();
                canvas.scene.unsetFlag("fxmaster", "effects");
              },
              defaultYes: true
            });
          },
          button: true
        }
      ]
    });
  }
});
