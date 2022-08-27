import { useContext, useState } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import { toast } from 'react-toastify';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as styles from './styles';
import { Button, Input } from '../../components';
import { http } from '../../services';
import { UserContext } from '../../context';
import loginImageWhite from '../../assets/loginLogoWhite.png';
import './style.css';

const ForgotPassword = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const steps = [
    'Enter your email',
    'Enter confirmation code',
    'Enter new password',
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    confirmationCode: '',
  });
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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sumbitFirstStep: any = async (values: { email: string }) => {
    setError('');
    setLoading(true);
    console.log(values);
    try {
      await http.post('api/v1/email-confirmation', values);
      setUserInfo({
        ...userInfo,
        userEmail: values.email,
      });
      setLoading(false);
      setError('');
      handleComplete();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setLoading(false);
      if (e.response.data.message) {
        setError(e.response.data.message);
        return;
      }
      setError(e.response.data);
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

  const secondStepSchema = yup.object().shape({
    confirmationCode: yup.string().required().length(6, 'Must be 6 characters'),
  });
  const submitSecondStep = async (values: { confirmationCode: string }) => {
    setError('');
    setLoading(true);
    try {
      console.log(values);
      await http.post('api/v1/verify-confirmation-code', {
        email: userInfo.userEmail,
        confirmationCode: values.confirmationCode,
      });
      setLoading(false);
      setError('');
      setUserInfo({
        ...userInfo,
        confirmationCode: values.confirmationCode,
      });
      handleComplete();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setLoading(false);
      if (e.response.data.message) {
        setError(e.response.data.message);
        return;
      }
      setError(e.response.data);
    }
  };
  const secondStepFormik = useFormik({
    initialValues: {
      confirmationCode: '',
    },
    validationSchema: secondStepSchema,
    onSubmit: submitSecondStep,
  });

  const thirdStepSchema = yup.object().shape({
    password: yup.string().required().min(6, 'Must be 8 characters'),
  });
  const submitThirdStep = async (values: { password: string }) => {
    setError('');
    setLoading(true);
    try {
      console.log(values);
      await http.post('api/v1/change-password', {
        email: userInfo.userEmail,
        confirmationCode: userInfo.confirmationCode,
        password: values.password,
      });

      setLoading(false);
      setError('');
      handleComplete();
      setUser({
        ...user,
        email: userInfo.userEmail,
      });
      toast.success('Password changed successfully');
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setLoading(false);
      if (e.response.data.message) {
        setError(e.response.data.message);
        return;
      }
      setError(e.response.data);
    }
  };
  const thirdStepFormik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: thirdStepSchema,
    onSubmit: submitThirdStep,
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
                  <Box sx={styles.formContainer}>
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
                    {error && (
                      <Typography
                        variant="body1"
                        sx={{ marginTop: '10px' }}
                        color="error"
                      >
                        {error}
                      </Typography>
                    )}
                    {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
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
                  <Box sx={styles.formContainer}>
                    <Typography
                      variant="h5"
                      sx={{
                        alignSelf: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      Enter the confirmation code sent to your email
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
                    {error && (
                      <Typography
                        variant="body1"
                        sx={{ marginTop: '10px' }}
                        color="error"
                      >
                        {error}
                      </Typography>
                    )}
                    {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
                  </Box>
                </form>
              </div>
            ) : null}
            {activeStep === 2 ? (
              <div>
                <form
                  onSubmit={thirdStepFormik.handleSubmit}
                  className="forgot-password-form-container"
                >
                  <Box sx={styles.formContainer}>
                    <Typography
                      variant="h5"
                      sx={{
                        alignSelf: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      Enter your new password
                    </Typography>
                    <Input
                      id="password"
                      label="password"
                      name="password"
                      type="password"
                      value={thirdStepFormik.values.password}
                      onChange={thirdStepFormik.handleChange}
                      error={
                        thirdStepFormik.touched.password &&
                        !!thirdStepFormik.errors.password
                      }
                      helperText={
                        thirdStepFormik.touched.password &&
                        thirdStepFormik.errors.password
                      }
                      fullWidth
                    />

                    <Button color="primary" type="submit" fullWidth>
                      Next
                    </Button>
                    {error && (
                      <Typography
                        variant="body1"
                        sx={{ marginTop: '10px' }}
                        color="error"
                      >
                        {error}
                      </Typography>
                    )}
                    {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
                  </Box>
                </form>
              </div>
            ) : null}
          </div>
        </Box>
      </div>
      <div className="login-image-container" />
    </div>
  );
};
export default ForgotPassword;
