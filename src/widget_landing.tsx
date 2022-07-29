import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { ThemeProvider } from "@mui/material/styles";

import { ReflashWidget, SensorMappingWidget } from "@webds/service";

const WIDTH = 800;
const HEIGHT_CONTENT = 250;

function getClientHeight() {
  return document.getElementById("webds_guided_config_widget_content")!
    .clientHeight;
}

export const Landing = (props: any): JSX.Element => {
  const [clientHeight, setClientHeight] = useState(getClientHeight());
  const [activeStep, setActiveStep] = useState(0);

  const webdsThemeInv = props.service.ui.getWebDSTheme({ inverted: true });

  const steps = [
    <ReflashWidget service={props.service} />,
    <SensorMappingWidget service={props.service} />
  ];
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    function handleResize() {
      setClientHeight(getClientHeight());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: clientHeight - 48 + "px",
          position: "relative"
        }}
      >
        <div
          style={{
            minWidth: WIDTH + "px",
            display: "inline-block"
          }}
        >
          <Paper
            elevation={5}
            sx={{
              width: "100%",
              minHeight: HEIGHT_CONTENT + "px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {steps[activeStep]}
          </Paper>
        </div>
        <ThemeProvider theme={webdsThemeInv}>
          <Box
            sx={{
              width: "300px",
              height: "50px",
              position: "absolute",
              bottom: "0px",
              left: "0px",
              display: "flex",
              justifyContent: "center"
            }}
          >
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
              sx={{ width: "100%" }}
            />
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
};
