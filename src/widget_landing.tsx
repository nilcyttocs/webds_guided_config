import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { ThemeProvider } from "@mui/material/styles";

import { ReflashWidget, SensorMappingWidget } from "@webds/service";

const WIDTH = 800;
const HEIGHT_CONTENT = 250;

const CONTROL_PANEL_ID = "webds_guided_config_control_panel";
const CONTROL_PANEL_WIDTH = 300;
const CONTROL_PANEL_HEIGHT = 75;

function dragElement(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element!.style.top = element!.offsetTop - pos2 + "px";
    element!.style.left = element!.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function dragMouseDown(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  element.onmousedown = dragMouseDown;
}

export const Landing = (props: any): JSX.Element => {
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
    dragElement(document.getElementById(CONTROL_PANEL_ID));
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight:
            document.getElementById("webds_guided_config_widget_content")!
              .clientHeight -
            48 +
            "px",
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
          <Paper
            id={CONTROL_PANEL_ID}
            sx={{
              width: CONTROL_PANEL_WIDTH + "px",
              height: CONTROL_PANEL_HEIGHT + "px",
              cursor: "move",
              position: "absolute",
              bottom: "0px",
              left: "0px"
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
