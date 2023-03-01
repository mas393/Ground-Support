import React from 'react';
import './App.css';
import { Button, Grid } from '@mui/material';
import { Stepper, Step, StepButton, StepLabel } from "@mui/material";

import SettingsDialog from '../components/SettingsDialog';

import TelemetryView from '../views/telemetry-view';

import ModulesView from '../views/modules-view';
import DataLog from '../components/DataLog';

function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const steps = ["Start up", "Standby", "Flight", "Recovery", "Flight Report"];

  const handleStep = (step: number) => () => {
    // check step number and handle view change here
    setActiveStep(step);
  };
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const handleSettingsDialog = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  function returnView(view: number){
    switch(view) {
      case 0:
        return <TelemetryView />
        break;
      case 1:
        return <TelemetryView />;
        break
      case 2:
        return <ModulesView />;
        break
      default:
        return <DataLog />;
    }
  }

  const fullHeight = {
    height: "100vh",
    overflow: "auto"
  };

	return (
		<div className="App">
			<Grid container spacing={2} direction="row">
				{/* Any views should be rendered within this grid item */}
				<Grid item xs={10}>
          {returnView(activeStep)}
				</Grid>

				<Grid item xs={2}>
          <Grid
            paddingX="1rem"
            paddingY="1rem"
            container
            direction="column"
            justifyContent="space-between"
            height="100%"
            style={fullHeight}
          >
            {/* TODO: Should call a Setting pop up */}
            <Grid item>
              <SettingsDialog isOpen={isSettingsOpen} onClose={()=>setIsSettingsOpen(false)}/>
              <Button variant="outlined" onClick={()=>handleSettingsDialog()}>Settings</Button>
            </Grid>

            {/* Page change stepper */}
            <Grid item>
              <Stepper
                nonLinear
                activeStep={activeStep}
                orientation="vertical"
              >
                {steps.map((label, index) => (
                  <Step
                    key={label}
                    completed={completed[index]}
                  >
                    <StepButton
                      color="inherit"
                      onClick={handleStep(index)}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Grid>

            {/* TODO: Should terminate all data readings */}
            <Grid item>
              <Button
                fullWidth={true}
                variant="contained"
                color="error"
              >
                End Mission
              </Button>
            </Grid>
          </Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
