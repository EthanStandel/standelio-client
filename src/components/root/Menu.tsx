import * as _ from "lodash";
import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import List from '@material-ui/core/List';
import { Link } from "react-router-dom";
import { Routes } from "./Routes";
import { makeStyles } from "@material-ui/core";
import { Properties } from "../../language/Properties";

export namespace Menu {

    export const Component: React.FC<{ width: string, onItemSelect?: (route: string) => any }> = ({ width, onItemSelect = _.noop }) => {
        const useStyles = makeStyles(theme => ({
            link: {
                textDecoration: "none",
                color: theme.palette.text.primary
            },
            menuWidth: { width }
        }));
    
        const classes = useStyles();

        const [ properties ] = Properties.useAppProperties();

        const pageIds = Object.keys(properties.pages) as Array<Properties.PageIds>;

        const routesAndLabels = pageIds.map(pageId => ({
            route: Routes.PageToRouteMap[pageId],
            label: properties.pages[pageId].title
        }));
    
        return (
            <List>
            {routesAndLabels.map(({ route, label }) => (
                <Link key={Math.random()} className={classes.link} onClick={() => onItemSelect(route)} to={route}>
                    <ListItem className={classes.menuWidth} button>
                        <ListItemText primary={label} />
                    </ListItem>
                </Link>
            ))}
            </List>
        );
    }

}
