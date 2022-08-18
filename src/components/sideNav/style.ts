export const drawer = {
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '14vw',
    backgroundColor: '#F6F8FE',
    border: 'none',
  },
};

export const listItem = {
  color: '#70708C',
  '&.active': {
    background: '#00000014',

    '& .MuiListItemIcon-root': {
      color: '#fff',
    },
  },
};
export const nestedListItem = {
  color: '#70708C',
  pl: 4.7,
};
export const listItemText = {
  pl: 2.2,
};
export const listItemButton = {
  height: '60px',

  '&.Mui-selected ': {
    backgroundColor: '#6838c914',
    color: '#6841C9',
    borderRadius: '5px',
  },
  '&:hover': {
    color: '#6841C9',
    borderRadius: '5px',
  },
};
export const nestedlistItemButton = {
  height: '50px',
  marginBottom: '5px',

  '&.Mui-selected ': {
    backgroundColor: '#6838c914',
    color: '#6841C9',
    borderRadius: '5px',
  },
  '&:hover': {
    color: '#6841C9',
    borderRadius: '5px',
  },
};
