/* eslint-disable @typescript-eslint/no-explicit-any */
export const Form = {
  display: 'flex',
  gap: { xl: 5, lg: 5, md: 2, sm: 0, xs: 0 },
  justifyContent: 'flex-end',
  flexDirection: {
    xl: 'row',
    lg: 'row',
    md: 'row',
    sm: 'colum',
    xs: 'column',
  },
  alignItems: {
    xl: 'center',
    lg: 'center',
    md: 'center',
    sm: 'flex-start',
    xs: 'flex-start',
  },
};

export const Typography = {
  alignSelf: 'flex-start',
  marginBottom: '0.3rem',
};

export const Backdrop = {
  color: '#fff',
  zIndex: (theme: any) => theme.zIndex.drawer + 999,
};
export const Button = {
  marginBottom: 0,

  p: 1.4,
  marginTop: '0.8rem',
};

export const PieContainer = {
  width: {
    xl: '48%',
    lg: '65%',
    md: '65%',
    sm: '75%',
    xs: '70%',
  },
  height: {
    xl: '48%',
    lg: '65%',
    md: '65%',
    sm: '75%',
  },
  display: 'flex',
  alignContent: 'center',
  marginLeft: {
    xl: '22%',
    lg: '15%',
    md: '15%',
    sm: '15%',
    xs: '15%',
  },
};

export const carousel = {
  width: {
    xl: '100%',
    lg: '100%',
    md: '100%',
    sm: '90%',
    xs: '100%',
  },
  height: {
    xl: '100%',
    lg: '100%',
    md: '100%',
    sm: '95%',
    xs: '70%',
  },
};

export const Title = {
  fontWeight: 500,
  display: {
    xl: 'flex',
    lg: 'flex',
    md: 'flex',
    sm: 'none',
    xs: 'none',
  },
};
