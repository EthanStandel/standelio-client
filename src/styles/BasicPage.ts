import { makeStyles } from "@material-ui/core";

export const useBasicPageStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        color: theme.palette.text.primary
    }
}));
