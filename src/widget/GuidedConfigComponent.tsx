import React, { useEffect, useState } from "react";

import { JupyterFrontEnd } from "@jupyterlab/application";

import { ReactWidget } from "@jupyterlab/apputils";

import Alert from "@mui/material/Alert";

import CircularProgress from "@mui/material/CircularProgress";

import { ThemeProvider } from "@mui/material/styles";

import { Landing } from "./Landing";

let alertMessage = "";

export const GuidedConfigWComponent = (props: any): JSX.Element => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      setInitialized(true);
    };
    initialize();
  }, []);

  const webdsTheme = props.service.ui.getWebDSTheme();
  const addGuidedTuningUsage = props.service.analytics.addGuidedTuningUsage;

  return (
    <>
      <ThemeProvider theme={webdsTheme}>
        {alert && (
          <Alert
            severity="error"
            onClose={() => setAlert(false)}
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {alertMessage}
          </Alert>
        )}
        {initialized && (
          <Landing
            frontend={props.frontend}
            service={props.service}
            addGuidedTuningUsage={addGuidedTuningUsage}
          />
        )}
        {!initialized && (
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
        )}
      </ThemeProvider>
    </>
  );
};

export default GuidedConfigWComponent;
