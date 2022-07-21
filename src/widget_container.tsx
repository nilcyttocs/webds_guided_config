import React, { useEffect, useState } from "react";

import { ReactWidget } from "@jupyterlab/apputils";

import Alert from "@mui/material/Alert";

import CircularProgress from "@mui/material/CircularProgress";

import { ThemeProvider } from "@mui/material/styles";

import { WebDSService } from "@webds/service";

let alertMessage = "";

const GuidedConfigContainer = (props: any): JSX.Element => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const initialize = async () => {
    setInitialized(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  const webdsTheme = props.service.ui.getWebDSTheme();

  return (
    <div className="jp-webds-widget-body">
      <ThemeProvider theme={webdsTheme}>
        {initialized ? null : (
          <>
            {alert && (
              <Alert
                severity="error"
                onClose={() => setAlert(false)}
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {alertMessage}
              </Alert>
            )}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }}
            >
              <CircularProgress color="primary" />
            </div>
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export class GuidedConfigWidget extends ReactWidget {
  service: WebDSService | null = null;

  constructor(service: WebDSService) {
    super();
    this.service = service;
  }

  render(): JSX.Element {
    return (
      <div className="jp-webds-widget">
        <GuidedConfigContainer service={this.service} />
      </div>
    );
  }
}
