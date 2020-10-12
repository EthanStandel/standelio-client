import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Properties } from "../../language/Properties";
import { Random } from "../../utils/Random";
import { Loading } from "./Loading";

export namespace Routes {

    export type PageMap<T> = Record<Properties.PageIds, T>;

    export const PageToRouteMap: PageMap<string> = {
        home: "/home",
        aboutUs: "/about-us"
    };

    const LazyPage: PageMap<React.LazyExoticComponent<React.FC>> = {
        home: React.lazy(() => import("../../pages/Home")),
        aboutUs: React.lazy(() => import("../../pages/AboutUs"))
    };

    export const Component = () => {
        const [ properties ] = Properties.useAppProperties();
        const pageIds = Object.keys(properties.pages) as Array<Properties.PageIds>;
        
        const routes = pageIds.map(pageId=> {
            const Page = LazyPage[pageId];
            return (
                <Route key={Random.Int().toString()} path={PageToRouteMap[pageId]}>
                    <Page />
                </Route>
            );
        });

        return (
            <React.Suspense fallback={<Loading.Component />}>
                <Switch>
                    {routes}
                    <Redirect from="*" to={PageToRouteMap.home} />
                </Switch>
            </React.Suspense>
        );
    }
}
