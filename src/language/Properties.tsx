import { PropertiesType } from "./PropertiesType";
import React, { useState, useEffect, useContext } from "react";

/**
 * To add another supported language, update LanguageLoader.SupportedLanguages enum,
 * and then add the translation file as ${languageCode}.json in this directory with
 * the same model as en.json.
 */
export namespace Properties {

    export enum SupportedLanguage {
        English = "en"
    }

    const LOCALE_KEY = "LOCALE";
    const exportLanguageToStorage = (language: SupportedLanguage) => localStorage.setItem(LOCALE_KEY, language);
    const importLanguageFromStorage = () => localStorage.getItem(LOCALE_KEY) as SupportedLanguage;
    const getDefaultLanguage = () => importLanguageFromStorage() ?? navigator.language.split("-")[0] as SupportedLanguage;

    type DispatchLanguage = React.Dispatch<React.SetStateAction<SupportedLanguage>>;
    type ComponentsProperties = PropertiesType["components"];
    type ComponentIds = keyof ComponentsProperties;
    type ContextType = [
        PropertiesType,
        DispatchLanguage
    ];
    export type PageProperties = PropertiesType["pages"];
    export type PageIds = keyof PageProperties;

    const Context = React.createContext<ContextType>([{}, () => undefined] as any as ContextType);

    export const useAppProperties = (): ContextType => {
        return useContext(Context);
    }

    export const useComponentProperties = <ComponentId extends ComponentIds>(componentId: ComponentId): ComponentsProperties[ComponentId] => {
        const [ properties ] = useAppProperties();
        return properties.components[componentId];
    }

    export const usePageProperties = <PageId extends PageIds>(pageId: PageId): PageProperties[PageId] => {
        const [ properties ] = useAppProperties();
        return properties.pages[pageId];
    }

    export const Component: React.FC = ({ children }) => {
        const [ properties, setProperties ] = useState<PropertiesType>({} as PropertiesType);
        const [ language, setLanguage ] = useState<SupportedLanguage>(getDefaultLanguage());
        const propertiesLoaded = !!properties.language;
        const forwardProps = { children, value: [ properties, setLanguage ] as ContextType };

        useEffect(() => {
            const isSupported = Object.values(SupportedLanguage).some(supportedLanguage => supportedLanguage === language);
            const languageToLoad = isSupported ? language : SupportedLanguage.English;
            exportLanguageToStorage(languageToLoad);

            if (isSupported) {
                console.log(`Loading "${language}" properties.`);
            } else {
                console.warn(`Language "${language}" is unsupported.  Falling back to "${SupportedLanguage.English}" properties.`);
            }

            import(`./${languageToLoad}`).then(setProperties);
        }, [language]);

        return propertiesLoaded ? <Context.Provider {...forwardProps} /> : null;
    }

}
