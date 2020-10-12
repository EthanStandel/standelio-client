import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core';
import { Viewport } from './Viewport';
import { Menu } from './Menu';
import { ThemeSwitcher } from './ThemeSwitcher';

export namespace Header {
    export interface Props {
        themeOptions?: ThemeOptions;
        onThemeTypeInvert?: () => any;
    }
    
    const small = "@media (min-width:0px) and (orientation: landscape)";
    const large = "@media (min-width:600px)";
    interface ToolbarMixin {
            minHeight: number | string,
            [small]: {
                minHeight: number | string
            },
            [large] : {
                minHeight: number | string
            }
    }
    
    const drawerWidth = "240px";
    const useStyles = makeStyles(theme => {
        const toolbarMixin: ToolbarMixin = theme.mixins.toolbar as any as ToolbarMixin;
        // Determine the page height by subtracting the toolbar height
        const heightMinusToolbar = {
            height: `calc(100% - ${toolbarMixin.minHeight}px)`,
            paddingTop: toolbarMixin.minHeight,
            [small]: {
                height: `calc(100% - ${toolbarMixin[small].minHeight}px)`,
                paddingTop: toolbarMixin[small].minHeight
            },
            [large]: {
                height: `calc(100% - ${toolbarMixin[large].minHeight}px)`,
                paddingTop: toolbarMixin[large].minHeight
            }
        }
    
        return {
            root: {
                height: "100vh",
                width: "100%"
            },
            nav: {
                display: "flex",
                ...heightMinusToolbar
            },
            spacer: {
                flexGrow: 1
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0
            },
            page: {
                width: "100%",
                height: "100%"
            },
            desktopMenu: {
                backgroundColor: theme.palette.background.paper
            }
        }
    });
    
    export const Component: React.FC<Props> = ({ onThemeTypeInvert, themeOptions, children }) => {
    
        const [ drawerState, setDrawerState ] = React.useState(false);
        const classes = useStyles();
        const [ viewportState ] = Viewport.useViewState();
        const toggleDrawerState = () => setDrawerState(!drawerState);
    
        const menuTrigger =
            viewportState === Viewport.State.Desktop ? null :
            <IconButton aria-label="open-menu" onClick={toggleDrawerState}>
                <MenuIcon />
            </IconButton>
    
        const drawerVariant = viewportState !== Viewport.State.Desktop ? "temporary" : "permanent";
    
        const menu = <Menu.Component onItemSelect={toggleDrawerState} width={drawerWidth} />;
        // TODO: Make sure this closes when a link is clicked
        const mobileMenu = (
            <Drawer className={classes.drawer}
                    variant={drawerVariant}
                    open={drawerState}
                    onClose={toggleDrawerState}>
                {menu}
            </Drawer>
        );
        const desktopMenu = (
            <div className={classes.desktopMenu}>
                {menu}
            </div>
        );
    
        return (
            <div className={classes.root}>
                <AppBar style={{ display: "flex", justifyContent: "space-between" }} 
                        position="fixed">
                    <Toolbar>
                        {menuTrigger}
                        <div className={classes.spacer} />
                        <ThemeSwitcher.Component />
                    </Toolbar>
                </AppBar>
                <div className={classes.nav}>
                    {viewportState === Viewport.State.Desktop ? desktopMenu : mobileMenu }
                    <main className={classes.page}>
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}
