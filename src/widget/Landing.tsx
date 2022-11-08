import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import MobileStepper from "@mui/material/MobileStepper";

import Fade from "@mui/material/Fade";

import { ThemeProvider } from "@mui/material/styles";

import { BackButton, NextButton } from "./mui_extensions/Button";

import { CONTROL_PANEL_WIDTH, CONTROL_PANEL_HEIGHT } from "./constants";

import ReflashComponent from "../Reflash/ReflashComponent";

import SensorMappingComponent from "../SensorMapping/SensorMappingComponent";

import InitialSetupComponent from "../InitialSetup/InitialSetupComponent";

let nextStep = 0;
let activeStep = 0;

export const Landing = (props: any): JSX.Element => {
  const [fade, setFade] = useState(false);

  const webdsThemeInv = props.service.ui.getWebDSTheme({ inverted: true });

  const steps = [
    {
      name: "Reflash",
      widget: <ReflashComponent service={props.service} />
    },
    {
      name: "Sensor Mapping",
      widget: <SensorMappingComponent service={props.service} />
    },
    {
      name: "Initial Setup",
      widget: (
        <InitialSetupComponent
          service={props.service}
          settingRegistry={props.setting}
        />
      )
    }
  ];
  const maxSteps = steps.length;

  const handleNext = () => {
    nextStep += 1;
    props.addGuidedTuningUsage(steps[nextStep].name);
    setFade(true);
  };

  const handleBack = () => {
    nextStep -= 1;
    props.addGuidedTuningUsage(steps[nextStep].name);
    setFade(true);
  };

  useEffect(() => {
    props.addGuidedTuningUsage(steps[activeStep].name);
    return () => {
      nextStep = 0;
      activeStep = 0;
    };
  }, []);

  return (
    <>
      <div>
        <Fade
          in={!fade}
          addEndListener={(node, done) => {
            node.addEventListener(
              "transitionend",
              () => {
                if (fade) {
                  activeStep = nextStep;
                  setFade(false);
                }
                done();
              },
              false
            );
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%)"
            }}
          >
            {steps[activeStep].widget}
          </div>
        </Fade>
      </div>
      <ThemeProvider theme={webdsThemeInv}>
        <Paper
          sx={{
            width: CONTROL_PANEL_WIDTH + "px",
            height: CONTROL_PANEL_HEIGHT + "px",
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translate(-50%)"
          }}
        >
          <div
            style={{
              height: "40%"
            }}
          >
            <Typography sx={{ padding: "8px", textAlign: "center" }}>
              Configuration Steps
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MobileStepper
              variant="text"
              position="static"
              steps={maxSteps}
              activeStep={activeStep}
              backButton={
                <BackButton
                  color="success"
                  size="large"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ width: "70px" }}
                />
              }
              nextButton={
                <NextButton
                  color="success"
                  size="large"
                  disabled={activeStep === maxSteps - 1}
                  onClick={handleNext}
                  sx={{ width: "70px" }}
                />
              }
              sx={{ width: "100%", bgcolor: "transparent" }}
            />
          </div>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default Landing;
