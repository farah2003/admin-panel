export const layout = {
  display: 'flex',

  height: '100vh',
  width: '100vw',
};
export const main = {
  marginLeft: {
    xs: '0',
    sm: '0',
    md: '0',
    lg: '20vw',
    xl: '14vw',
  },
  height: '100vh',
  width: {
    xs: '100vw',
    sm: '100vw',
    md: '100vw',
    lg: 'calc(100vw - 20vw)',
    xl: 'calc(100vw - 14vw)',
  },
  backgroundColor: ['secondary.main'],
};
export const content = {
  width: '96%',
  height: '90%',
  margin: '.4% 2%',
  borderRadius: {
    lg: '20px',
    xl: '20px',
  },

  display: 'flex',
  backgroundColor: ['secondary.light'],
};
