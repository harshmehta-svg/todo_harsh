// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import bellSolid from '@iconify/icons-eva/bell';
import bellFill from '@iconify/icons-eva/bell-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
import { makeStyles } from '@mui/styles';
import { Alert, Badge, Button, Collapse, Drawer, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, Radio, RadioGroup, Switch } from '@mui/material';

// Define styles for the component
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiSvgIcon-root': {
            fontSize: 18,
        },
    },
    drawer: {
        '& .MuiDrawer-paper': {
            width: 'auto',
            top: 'auto',
            height: 'auto',
            boxSizing: 'border-box',
            padding: theme.spacing(2),
        },
    },
    list: {
        '& li': {
            padding: theme.spacing(0, 0, 0, 2),
            minHeight: 48,
            justifyContent: 'space-between',
            padding: theme.spacing(1),
            color: theme.palette.common.white,
            '&:hover': {
                backgroundColor: theme.palette.grey[700],
            },
            '&.Mui-selected': {
                backgroundColor: theme.palette.common.white,
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    backgroundColor: theme.palette.primary,
                },
            },
        },
    },
    button: {
        width: '80%',
        margin: theme.spacing(1),
        textTransform: 'none',
        fontSize: 16,
        "&.MuiButton-text": {
            padding: theme.spacing(0, 0, 0, 4),
        },
        "&.MuiButton-outlinedPrimary": {
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
                backgroundColor: `${theme.palette.background.default}`,
            },
        },
    },
}));

function NotificationBell({ unreadCount, onMarkAllAsRead }) {
    // Define state and variables needed for the component
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [allRead, setAllRead] = useState(false);

    useEffect(() => {
        setAllRead(false);
    }, [unreadCount]);

    // Render the component
    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={openDrawer}
                onOpen={() => setOpenDrawer(true)}
                onClose={() => setOpenDrawer(false)}
                TransitionProps={{ easing: (t: number) => t }}
            >
                <div className={classes.root}>
                    <Badge badgeContent={unreadCount} overlap="circular" color="error">
                        <Button
                            className={classes.button}
                            startIcon={<Icon icon={bellSolid} />}
                            onClick={() => setOpenDrawer(!openDrawer)}
                        >
                            Notifications
                        </Button>
                    </Badge>
                    <Collapse in={openDrawer} mountOnEnter unmountOnExit>
                        <List className={classes.list}>
                            {/* List notifications here */}
                            <ListItem button>
                                <ListItemIcon>
                                    <Icon icon={bellFill} />
                                </ListItemIcon>
                                <ListItemText primary="Notification 1" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Icon icon={bellFill} />
                                </ListItemIcon>
                                <ListItemText primary="Notification 2" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Icon icon={bellFill} />
                                </ListItemIcon>
                                <ListItemText primary="Notification 3" />
                            </ListItem>
                        </List>
                        <div style={{ marginTop: "20px", display: "flex" }}>
                            <FormControlLabel
                                control={
                                    <Switch checked={allRead} onChange={(e) => setAllRead(!allRead)} />
                                }
                                label="Mark all as read"
                            />
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={onMarkAllAsRead}
                                disabled={!allRead}
                                style={{
                                    margin: "auto",
                                    float: "right"
                                }}
                            >
                                Mark all as read
                            </Button>
                        </div>
                    </Collapse>
                </div>
            </Drawer>
            <Badge badgeContent={unreadCount} overlap="circular" color="error">
                <Button
                    className={classes.button}
                    startIcon={<Icon icon={bellSolid} />}
                    onClick={() => setOpenDrawer(!openDrawer)}
                >
                    Notifications
                </Button>
            </Badge>
        </>
    );
}

export default NotificationBell;