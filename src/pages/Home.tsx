import { makeStyles } from "@material-ui/core";
import React from "react";
import { Headshot } from "../components/home/Headshot";
import { Card } from '@material-ui/core';
import { Properties } from "../language/Properties";
import { Viewport } from "../components/root/Viewport";

export namespace Home {

    const pageId: Properties.PageIds = "home";

    const useStyles = (viewport: Viewport.State) => (makeStyles(_theme => {
        const container = {
            padding: "2rem"
        };
        return {
            card: {
                margin: "auto",
                maxWidth: viewport === Viewport.State.Tablet ? "90%" : "80%",
                ...container
            },
            container
        };
    }))();

    export const Page: React.FC = () => {
        const properties = Properties.usePageProperties(pageId);

        const [ viewport ] = Viewport.useViewState();
        const classes = useStyles(viewport);

        const wrapper = (children: React.ReactNode) => viewport !== Viewport.State.Mobile ?
            <Card children={children} className={classes.card} />
            : <div children={children} className={classes.container} />
             
        
        return wrapper(<>
                <h1>{properties.title}</h1>
                <Headshot.Component uri="/headshot.jpg" />
        </>);
    }

}

export default Home.Page;