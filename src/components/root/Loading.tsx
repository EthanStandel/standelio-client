import React from "react";
import { Properties } from "../../language/Properties";
import { useBasicPageStyles } from "../../styles/BasicPage";

export namespace Loading {
    
    export const Component = () => {
        const properties = Properties.useComponentProperties("loading");

        return <div className={useBasicPageStyles().root}>{properties.title}</div>
    }

}