export const drawer = {
  '& .MuiDrawer-paper': {
    width: {
      xs: '60vw',
      sm: '50vw',
      md: '30vw',
      lg: '20vw',
      xl: '14vw',
    },
    border: {
      lg: 'none',
      xl: 'none',
    },
  },
};

export const listItem = {
  color: ['secondary.dark'],
};
export const nestedListItem = {
  color: ['secondary.dark'],
  pl: 4.7,
};
export const listItemText = {
  pl: 2.2,
};
const selectedItem = {
  backgroundColor: ['primary.light'],
  color: ['primary.main'],
  borderRadius: {
    lg: '5px',
    xl: '5px',
  },
};
const hoveredItem = {
  color: ['primary.main'],
  borderRadius: {
    lg: '5px',
    xl: '5px',
  },
};
export const listItemButton = {
  height: '60px',
  '&.Mui-selected ': selectedItem,
  '&:hover': hoveredItem,
  marginBottom: '.5vh',
};

export const nestedlistItemButton = {
  height: '50px',
  marginBottom: '2.5px',
  marginTop: '2.5px',

  '&.Mui-selected ': selectedItem,
  '&:hover': hoveredItem,
};

export const Icon = {
  display: {
    xs: 'flex',
    sm: 'flex',
    md: 'flex',
    lg: 'none',
    xl: 'none',
  },
  marginTop: '1vh',
  cursor: 'pointer',
};
export const imageContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignContent: 'center',
};
export const image = {
  width: '200px',
  cursor: 'pointer',
};
export const drawerHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
};
