import React from "react";
import { Properties } from "../language/Properties";
import { useBasicPageStyles } from "../styles/BasicPage";

export namespace AboutUs {

    export const Page: React.FC = () => {
        const classes = useBasicPageStyles();
        const properties = Properties.usePageProperties("aboutUs");
    
        return (
            <div className={classes.root}>{properties.title}</div>
        );
    }

}

export default AboutUs.Page;