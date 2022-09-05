import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import './style.css';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const ForgotPassword = () => {
  const steps = [
    'Enter your email',
    'Enter confirmation code',
    'Enter new password',
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <Typography
          variant="h4"
          sx={{ marginBottom: '30px', fontWeight: '400' }}
          color="primary"
        >
          Reset your password
        </Typography>
        <Box
          sx={{
            width: {
              xl: 400,
              lg: 400,
              md: '100%',
              sm: '100%',
              xs: '100%',
            },
          }}
        >
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" />
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 ? (
              <FirstStep handleComplete={handleComplete} />
            ) : null}
            {activeStep === 1 ? (
              <SecondStep handleComplete={handleComplete} />
            ) : null}
            {activeStep === 2 ? (
              <ThirdStep handleComplete={handleComplete} />
            ) : null}
          </div>
        </Box>
      </div>
      <div className="login-image-container" />
    </div>
  );
};
export default ForgotPassword;
