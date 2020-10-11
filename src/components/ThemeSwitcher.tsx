import React from "react";
import LightModeIcon from "@material-ui/icons/Brightness7";
import DarkModeIcon from "@material-ui/icons/Brightness4";
import { IconButton } from "@material-ui/core";
import { Theme } from "../Theme";

export namespace ThemeSwitcher {

    export interface Props {
        className?: string;
    }

    export const Component: React.FC<Props> = ({ className }) => {
        const [{ themeOptions }, setThemeOptions] = Theme.useTheme();

        const buttonProps = {
            className,
            onClick: () => {
                setThemeOptions(Theme.mapToInvertedTheme(themeOptions));
            }
        };

        return (
            <IconButton {...buttonProps}>
                {Theme.isDark(themeOptions)  ? <LightModeIcon /> : <DarkModeIcon /> }
            </IconButton>
        );
    }

}
