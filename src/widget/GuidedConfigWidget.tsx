import React from "react";

import { JupyterFrontEnd } from "@jupyterlab/application";

import { ReactWidget } from "@jupyterlab/apputils";

import { ISettingRegistry } from "@jupyterlab/settingregistry";

import GuidedConfigComponent from "./GuidedConfigComponent";

export class GuidedConfigWidget extends ReactWidget {
  id: string;
  frontend: JupyterFrontEnd;
  setting: ISettingRegistry;

  constructor(
    id: string,
    app: JupyterFrontEnd,
    setting: ISettingRegistry
  ) {
    super();
    this.id = id;
    this.frontend = app;
    this.setting = setting;
  }

  render(): JSX.Element {
    return (
      <div id={this.id + "_container"} className="jp-webds-widget-container">
        <div id={this.id + "_content"} className="jp-webds-widget">
          <GuidedConfigComponent
            frontend={this.frontend}
            setting={this.setting}
          />
        </div>
      </div>
    );
  }
}

export default GuidedConfigWidget;
