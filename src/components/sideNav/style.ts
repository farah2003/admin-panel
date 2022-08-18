export const drawer = {
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '14vw',
    backgroundColor: '#F6F8FE',
    border: 'none',
  },
};

export const listItem = {
  color: ['secondary.main'],
};
export const nestedListItem = {
  color: ['secondary.main'],
  pl: 4.7,
};
export const listItemText = {
  pl: 2.2,
};
export const listItemButton = {
  height: '60px',
  '&.Mui-selected ': {
    backgroundColor: ['primary.light'],
    color: ['primary.main'],
    borderRadius: '5px',
  },
  '&:hover': {
    color: ['primary.main'],
    borderRadius: '5px',
  },
};
export const nestedlistItemButton = {
  height: '50px',
  marginBottom: '2.5px',
  marginTop: '2.5px',

  '&.Mui-selected ': {
    backgroundColor: ['primary.light'],
    color: ['primary.main'],
    borderRadius: '5px',
  },
  '&:hover': {
    color: ['primary.main'],
    borderRadius: '5px',
  },
};

export const imageContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
};
export const image = {
  width: '200px',
};
