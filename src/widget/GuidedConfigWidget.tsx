import React from 'react';

import { ReactWidget } from '@jupyterlab/apputils';

import GuidedConfigComponent from './GuidedConfigComponent';

export class GuidedConfigWidget extends ReactWidget {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  render(): JSX.Element {
    return (
      <div id={this.id + '_container'} className="jp-webds-widget-container">
        <div id={this.id + '_content'} className="jp-webds-widget">
          <GuidedConfigComponent />
        </div>
      </div>
    );
  }
}

export default GuidedConfigWidget;
