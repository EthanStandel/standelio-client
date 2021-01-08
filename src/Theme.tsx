import React, { useContext } from "react";
import * as _ from "lodash";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState, Dispatch } from "react";
import { ThemeOptions, Theme as MuiTheme } from "@material-ui/core/styles/createMuiTheme";

export namespace Theme {

    const THEME_KEY = "THEME";

    const primary = {
        main: "#00AF72"
    };

    const systemColorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const defaultTheme: ThemeOptions = {
        palette: {
            primary,
            type: systemColorTheme
        }
    };

    const Context = React.createContext<HookContext>([{}, () => undefined] as any as HookContext);

    const getOptionsFromStorage = (): ThemeOptions => {
        const storedTheme = localStorage.getItem(THEME_KEY);
    
        if (typeof storedTheme === "string") {
            return JSON.parse(storedTheme) as ThemeOptions;
        } else {
            storeOptions(defaultTheme);
            return defaultTheme;
        }
    }

    const storeOptions = (theme: ThemeOptions) => {
        localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    }

    const useAndStoreTheme = (): HookContext => {
        const initialOptions: ThemeOptions = getOptionsFromStorage();
        const [ { theme, themeOptions }, setState ]  = useState({
            theme: createMuiTheme(initialOptions),
            themeOptions: initialOptions
        });

        document.body.style.backgroundColor = theme.palette.background.default;

        return [
            { theme, themeOptions },
            (themeOptions: ThemeOptions) => {
                storeOptions(themeOptions);
                setState({
                    theme: createMuiTheme(themeOptions),
                    themeOptions
                });
            }
        ];
    }

    export interface State {
        theme: MuiTheme;
        themeOptions: ThemeOptions;
    }

    export type HookContext = [State, Dispatch<ThemeOptions>];

    export const useTheme = (): HookContext => {
        return useContext(Context);
    }

    export const Component: React.FC = ({ children }) => {
        const value = useAndStoreTheme();
        const [{ theme }] = value;
        const forwardProps = { theme, children };

        return (
            <Context.Provider value={value}>
                <ThemeProvider {...forwardProps} />
            </Context.Provider>
        );
    }

    export const isDark = (themeOptions: ThemeOptions): boolean => {
        return themeOptions?.palette?.type === "dark";
    }

    export const mapToInvertedTheme = (themeOptions: ThemeOptions): ThemeOptions => {
        return _.merge(
            {  }, themeOptions,
            {
                palette: { 
                    type: isDark(themeOptions) ? "light" : "dark" 
                }
            }
        );
    }

}
