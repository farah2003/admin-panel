import { useContext, useState } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Input } from '../../components';
import loginImage from '../../assets/loginLogo.png';
import { UserContext } from '../../context';
import { http } from '../../services';
import { LoginCredentials } from '../../interfaces';
import loginImageWhite from '../../assets/loginLogoWhite.png';
import './style.css';

const ForgotPassword = () => {
  const steps = [
    'Enter your email',
    'Enter confirmation code',
    'Enter new password',
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [firstError, setFirstError] = useState('');
  const [firstLoading, setFirstLoading] = useState(false);
  const [secondError, setSecondError] = useState('');
  const [secondLoading, setSecondLoading] = useState(false);
  const [email, setEmail] = useState('');
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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sumbitFirstStep: any = async (values: { email: string }) => {
    setFirstLoading(true);
    console.log(values);
    try {
      // await http.post('api/v1/email-confirmation', values);
      setEmail(values.email);
      setFirstLoading(false);
      handleComplete();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setFirstLoading(false);
      if (e.response.data.message) {
        setFirstError(e.response.data.message);
        return;
      }
      setFirstError(e.response.data);
    }
  };
  const firstStepSchema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const firstStepFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: firstStepSchema,
    onSubmit: sumbitFirstStep,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sumbitSecondStep: any = async (values: { confirmatioCode: string }) => {
    setSecondLoading(true);
    handleComplete();
  };
  const secondStepSchema = yup.object().shape({
    confirmatioCode: yup
      .string()
      .length(6, 'confirmation code should be 6 numbers')
      .required(),
  });
  const secondStepFormik = useFormik({
    initialValues: {
      confirmationCode: '',
    },
    validationSchema: secondStepSchema,
    onSubmit: sumbitSecondStep,
  });

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
              <div>
                <form
                  onSubmit={firstStepFormik.handleSubmit}
                  className="forgot-password-form-container"
                >
                  <Box
                    sx={{
                      width: {
                        xl: 400,
                        lg: 400,
                        md: '100%',
                        sm: '100%',
                        xs: '100%',
                      },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        alignSelf: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      Enter your email
                    </Typography>
                    <Input
                      id="email"
                      label="email"
                      name="email"
                      value={firstStepFormik.values.email}
                      onChange={firstStepFormik.handleChange}
                      error={
                        firstStepFormik.touched.email &&
                        !!firstStepFormik.errors.email
                      }
                      helperText={
                        firstStepFormik.touched.email &&
                        firstStepFormik.errors.email
                      }
                      fullWidth
                    />

                    <Button color="primary" type="submit" fullWidth>
                      Next
                    </Button>
                    {firstError && (
                      <Typography
                        variant="body1"
                        sx={{ marginTop: '10px' }}
                        color="error"
                      >
                        {firstError}
                      </Typography>
                    )}
                    {firstLoading && (
                      <CircularProgress sx={{ marginTop: '20px' }} />
                    )}
                  </Box>
                </form>
              </div>
            ) : null}
            {activeStep === 1 ? (
              <div>
                <form
                  onSubmit={secondStepFormik.handleSubmit}
                  className="forgot-password-form-container"
                >
                  <Box
                    sx={{
                      width: {
                        xl: 400,
                        lg: 400,
                        md: '100%',
                        sm: '100%',
                        xs: '100%',
                      },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        alignSelf: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      Enter your confirmation code
                    </Typography>
                    <Input
                      id="confirmationCode"
                      label="Confirmation Code"
                      name="confirmationCode"
                      value={secondStepFormik.values.confirmationCode}
                      onChange={secondStepFormik.handleChange}
                      error={
                        secondStepFormik.touched.confirmationCode &&
                        !!secondStepFormik.errors.confirmationCode
                      }
                      helperText={
                        secondStepFormik.touched.confirmationCode &&
                        secondStepFormik.errors.confirmationCode
                      }
                      fullWidth
                    />

                    <Button color="primary" type="submit" fullWidth>
                      Next
                    </Button>
                    {secondError && (
                      <Typography
                        variant="body1"
                        sx={{ marginTop: '10px' }}
                        color="error"
                      >
                        {secondError}
                      </Typography>
                    )}
                    {secondLoading && (
                      <CircularProgress sx={{ marginTop: '20px' }} />
                    )}
                  </Box>
                </form>
              </div>
            ) : null}
            {activeStep === 2 ? (
              <div>
                <Typography variant="h4" sx={{ marginBottom: '30px' }}>
                  Welcome to Testmate3
                </Typography>
              </div>
            ) : null}
          </div>
        </Box>
      </div>
      <div className="login-image-container">
        <img src={loginImageWhite} alt="logo" className="login-image" />
      </div>
    </div>
  );
};
export default ForgotPassword;
