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
  marginTop: '0.8rem',
  alignSelf: 'flex-start',
  marginBottom: '0.3rem',
};

export const Backdrop = {
  color: '#fff',
  zIndex: (theme: any) => theme.zIndex.drawer + 999,
};
export const Button = {
  marginBottom: 0,
  p: 1.6,
  marginTop: '1.9rem',
};

export const PieContainer = {
  width: { xl: '40%', lg: '65%', md: '55%', sm: '60%', xs: '100%' },
  height: '46%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
export const HeaderSection = {
  idth: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
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

export const BarChartContainer = {
  marginTop: { xl: '2%', lg: '2%', md: '20%', sm: '10%', xs: '20%' },
  width: { xl: '88%', lg: '90%', md: '80%', sm: '90%', xs: '90%' },
  height: '100%',
};
export const ChartContainer = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
};

export const CarsouselContainer = {
  width: '100%',
  height: '100%',
  padding: '0 10px',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
};
export const Carousel = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

export const Icons = {
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  width: 'auto',
  color: '#7750d9',
  fontSize: '30px',
  fontWeight: 'bold',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#7750d9',
    color: '#ffff',
  },
};

export const prev = {
  paddingLeft: '.8%',
};

export const next = {
  paddingLeft: '.4%',
  right: '0',
};
