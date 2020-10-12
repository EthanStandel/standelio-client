import { makeStyles } from "@material-ui/core";
import React from "react";
import { Properties } from "../../language/Properties";

export namespace Headshot {

    const useStyles = makeStyles(_theme => ({
        image: {
            borderRadius: "50%"
        }
    }));

    export interface Props {
        uri: string;
    }

    export const Component: React.FC<Props> = ({ uri }) => {
        const classes = useStyles();

        const properties = Properties.useComponentProperties("headshot");

        return (
            <img src={uri} className={classes.image} alt={properties.imgAlt} />
        );
    }

}
