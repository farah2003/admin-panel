import * as Yup from 'yup';

const timePeriodSchema = Yup.object({
  startingDate: Yup.date().required('Starting date is required'),
  endingDate: Yup.date()
    .required('Ending date is required')
    .min(
      Yup.ref('startingDate'),
      'Ending date must be greater than starting date'
    ),
});
export default timePeriodSchema;
