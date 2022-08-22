import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { ThemeProvider } from "@mui/material/styles";

import { ReflashWidget, SensorMappingWidget } from "@webds/service";

const CONTROL_PANEL_WIDTH = 400;
const CONTROL_PANEL_HEIGHT = 75;

export const Landing = (props: any): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);

  const webdsThemeInv = props.service.ui.getWebDSTheme({ inverted: true });

  const steps = [
    <ReflashWidget service={props.service} />,
    <SensorMappingWidget service={props.service} />
  ];
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%", display: "relative" }}>
        <div>
          <Paper
            elevation={5}
            sx={{
              position: "absolute",
              top: "24px",
              left: "50%",
              transform: "translate(-50%)"
            }}
          >
            {steps[activeStep]}
          </Paper>
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
                nextButton={
                  <Button
                    variant="text"
                    color="success"
                    size="large"
                    disabled={activeStep === maxSteps - 1}
                    onClick={handleNext}
                    sx={{ width: "70px" }}
                  >
                    Next
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button
                    variant="text"
                    color="success"
                    size="large"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ width: "70px" }}
                  >
                    <KeyboardArrowLeft />
                    Back
                  </Button>
                }
                sx={{ width: "100%", bgcolor: "transparent" }}
              />
            </div>
          </Paper>
        </ThemeProvider>
      </div>
    </>
  );
};
