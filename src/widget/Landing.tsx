import React, { useEffect, useState } from 'react';

import Fade from '@mui/material/Fade';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONTROL_PANEL_HEIGHT, CONTROL_PANEL_WIDTH } from './constants';
import InitialSetupComponent from './InitialSetup/InitialSetupComponent';
import IntegrationDurationComponent from './IntegrationDuration/IntegrationDurationComponent';
import { webdsService } from './local_exports';
import { BackButton, NextButton } from './mui_extensions/Buttons';
import ReflashComponent from './Reflash/ReflashComponent';
import SensorMappingComponent from './SensorMapping/SensorMappingComponent';

let nextStep = 0;
let activeStep = 0;

export const Landing = (props: any): JSX.Element => {
  const [fade, setFade] = useState(false);

  const webdsThemeInv = webdsService.ui.getWebDSTheme({ inverted: true });

  const steps = [
    {
      name: 'Reflash',
      widget: <ReflashComponent />
    },
    {
      name: 'Sensor Mapping',
      widget: <SensorMappingComponent />
    },
    {
      name: 'Initial Setup',
      widget: <InitialSetupComponent />
    },
    {
      name: 'Integration Duration',
      widget: <IntegrationDurationComponent />
    }
  ];
  const maxSteps = steps.length;

  const handleNext = () => {
    nextStep += 1;
    webdsService.analytics.addGuidedTuningUsage(steps[nextStep].name);
    setFade(true);
  };

  const handleBack = () => {
    nextStep -= 1;
    webdsService.analytics.addGuidedTuningUsage(steps[nextStep].name);
    setFade(true);
  };

  useEffect(() => {
    webdsService.analytics.addGuidedTuningUsage(steps[activeStep].name);
    return () => {
      nextStep = 0;
      activeStep = 0;
    };
  }, []);

  return (
    <>
      <div className="jp-webds-widget-outer-pseudo">
        <div style={{ display: 'table-row' }}>
          <Fade
            in={!fade}
            addEndListener={(node, done) => {
              node.addEventListener(
                'transitionend',
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
                display: 'table-cell',
                verticalAlign: 'top'
              }}
            >
              {steps[activeStep].widget}
            </div>
          </Fade>
        </div>
        <ThemeProvider theme={webdsThemeInv}>
          <div style={{ display: 'table-row' }}>
            <div
              style={{
                display: 'table-cell',
                verticalAlign: 'bottom'
              }}
            >
              <div className="jp-webds-widget-body">
                <Paper
                  sx={{
                    width: CONTROL_PANEL_WIDTH + 'px',
                    height: CONTROL_PANEL_HEIGHT + 'px'
                  }}
                >
                  <div
                    style={{
                      height: '40%'
                    }}
                  >
                    <Typography sx={{ padding: '8px', textAlign: 'center' }}>
                      Configuration Steps
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                          sx={{ width: '70px' }}
                        />
                      }
                      nextButton={
                        <NextButton
                          color="success"
                          size="large"
                          disabled={activeStep === maxSteps - 1}
                          onClick={handleNext}
                          sx={{ width: '70px' }}
                        />
                      }
                      sx={{ width: '100%', bgcolor: 'transparent' }}
                    />
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Landing;
