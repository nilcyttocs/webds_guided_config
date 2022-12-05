import React from "react";

import { JupyterFrontEnd } from "@jupyterlab/application";

import { ReactWidget } from "@jupyterlab/apputils";

import { ISettingRegistry } from "@jupyterlab/settingregistry";

import { WebDSService } from "@webds/service";

import GuidedConfigComponent from "./GuidedConfigComponent";

export class GuidedConfigWidget extends ReactWidget {
  id: string;
  frontend: JupyterFrontEnd;
  service: WebDSService;
  setting: ISettingRegistry;

  constructor(
    id: string,
    app: JupyterFrontEnd,
    service: WebDSService,
    setting: ISettingRegistry
  ) {
    super();
    this.id = id;
    this.frontend = app;
    this.service = service;
    this.setting = setting;
  }

  render(): JSX.Element {
    return (
      <div id={this.id + "_container"} className="jp-webds-widget-container">
        <div id={this.id + "_content"} className="jp-webds-widget">
          <GuidedConfigComponent
            frontend={this.frontend}
            service={this.service}
            setting={this.setting}
          />
        </div>
      </div>
    );
  }
}

export default GuidedConfigWidget;
