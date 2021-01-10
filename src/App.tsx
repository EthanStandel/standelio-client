import React from "react";
import { Theme } from "./Theme";
import { Properties } from "./language/Properties";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/root/Header";
import { Routes } from "./components/root/Routes";
import { GardenServiceProvider } from "./providers/GardenService";
import { Viewport } from "./components/root/Viewport";

export namespace App {

    export const Component: React.FC = () => {

        return (
            <Viewport.Root>
                <Properties.Component>
                    <Theme.Component>
                        <GardenServiceProvider.Component>
                            <BrowserRouter>
                                <Header.Component>
                                    <Routes.Component />
                                </Header.Component>
                            </BrowserRouter>
                        </GardenServiceProvider.Component>`
                    </Theme.Component>
                </Properties.Component>
            </Viewport.Root>
        );
    }

}
