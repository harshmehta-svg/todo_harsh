// src/components/UserList.js

import React from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import UserListItem from './UserListItem';

const useStyles = makeStyles((theme) => ({
  userList: {
    overflowY: 'auto',
    height: 'calc(100vh - 300px)',
  },
}));

const UserList = ({ users }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <List className={classes.userList}>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </List>
  );
};

export default UserList;

// src/components/UserListItem.js (CREATE THIS FILE)

import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const useStyles = makeStyles((theme) => ({
  userListItem: {
    padding: 0,
  },
  avatar: {
    fontSize: 15,
  },
}));

const UserListItem = ({ user }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.userListItem}>
      <Avatar className={classes.avatar}>{user initials}</Avatar>
      <ListItemText primary={user.name} secondary={user.email} />
    </ListItem>
  );
};

export default UserListItem;