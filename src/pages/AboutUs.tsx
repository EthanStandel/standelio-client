import React from "react";
import { Properties } from "../language/Properties";
import { useBasicPageStyles } from "../styles/BasicPage";

export namespace AboutUs {

    const pageId: Properties.PageIds = "aboutUs";

    export const Page: React.FC = () => {
        const classes = useBasicPageStyles();
        const properties = Properties.usePageProperties(pageId);
    
        return (
            <div className={classes.root}>{properties.title}</div>
        );
    }

}

export default AboutUs.Page;
