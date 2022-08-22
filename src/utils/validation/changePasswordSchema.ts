import * as Yup from 'yup';

const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().min(
    6,
    'Password must be at least 6 characters long'
  ),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be less than 20 characters long')
    .when('oldPassword', (oldPassword, schema) => {
      return oldPassword
        ? schema.notOneOf(
            [oldPassword],
            'Old password cannot be the same as new password'
          )
        : schema;
    }),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must match'
  ),
});
export default changePasswordSchema;
