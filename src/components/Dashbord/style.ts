export const layout = {
  display: 'flex',
  flexDirection: 'column',
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
  height: '89%',
  margin: '.4% 2%',
  borderRadius: {
    lg: '20px',
    xl: '20px',
  },
  backgroundColor: ['secondary.light'],
};
