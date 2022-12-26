import React, { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";

import CircularProgress from "@mui/material/CircularProgress";

import { ThemeProvider } from "@mui/material/styles";

import { Landing } from "./Landing";

import { webdsService } from "./local_exports";

let alertMessage = "";

export const GuidedConfigWComponent = (props: any): JSX.Element => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const webdsTheme = webdsService.ui.getWebDSTheme();
  const addGuidedTuningUsage = webdsService.analytics.addGuidedTuningUsage;

  useEffect(() => {
    const initialize = async () => {
      setInitialized(true);
    };
    initialize();
  }, []);

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
            setting={props.setting}
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
