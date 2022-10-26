import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import { WidgetTracker } from "@jupyterlab/apputils";

import { ILauncher } from "@jupyterlab/launcher";

import { ISettingRegistry } from "@jupyterlab/settingregistry";

import { WebDSService, WebDSWidget } from "@webds/service";

import { guidedConfigIcon } from "./icons";

import GuidedConfigWidget from "./widget/GuidedConfigWidget";

namespace Attributes {
  export const command = "webds_guided_config:open";
  export const id = "webds_guided_config_widget";
  export const label = "Guided";
  export const caption = "Guided";
  export const category = "Touch - Configuration";
  export const rank = 10;
}

/**
 * Initialization data for the @webds/guided_config extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: "@webds/guided_config:plugin",
  autoStart: true,
  requires: [ILauncher, ILayoutRestorer, ISettingRegistry, WebDSService],
  activate: async (
    app: JupyterFrontEnd,
    launcher: ILauncher,
    restorer: ILayoutRestorer,
    setting: ISettingRegistry,
    service: WebDSService
  ) => {
    console.log("JupyterLab extension @webds/guided_config is activated!");

    await service.initialized;

    let widget: WebDSWidget;
    const { commands, shell } = app;
    const command = Attributes.command;
    commands.addCommand(command, {
      label: Attributes.label,
      caption: Attributes.caption,
      icon: (args: { [x: string]: any }) => {
        return args["isLauncher"] ? guidedConfigIcon : undefined;
      },
      execute: () => {
        if (!widget || widget.isDisposed) {
          const content = new GuidedConfigWidget(
            Attributes.id,
            app,
            service,
            setting
          );
          widget = new WebDSWidget<GuidedConfigWidget>({ content });
          widget.id = Attributes.id;
          widget.title.label = Attributes.label;
          widget.title.icon = guidedConfigIcon;
          widget.title.closable = true;
        }

        if (!tracker.has(widget)) tracker.add(widget);

        if (!widget.isAttached) shell.add(widget, "main");

        shell.activateById(widget.id);
      }
    });

    launcher.add({
      command,
      args: { isLauncher: true },
      category: Attributes.category,
      rank: Attributes.rank
    });

    let tracker = new WidgetTracker<WebDSWidget>({
      namespace: Attributes.id
    });
    restorer.restore(tracker, {
      command,
      name: () => Attributes.id
    });
  }
};

export default plugin;
