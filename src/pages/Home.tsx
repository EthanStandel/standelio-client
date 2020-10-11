import React from "react";
import { Properties } from "../language/Properties";
import { useBasicPageStyles } from "../styles/BasicPage";

export namespace Home {

    export const Page: React.FC = () => {
        const classes = useBasicPageStyles();
        const properties = Properties.usePageProperties("home");

        return (
        <div className={classes.root}>{properties.title}</div>
        );
    }

}

export default Home.Page;