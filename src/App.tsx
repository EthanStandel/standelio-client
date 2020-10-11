import React from "react";
import { Theme } from "./Theme";
import { Properties } from "./language/Properties";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { Routes } from "./components/Routes";

export namespace App {

    export const Component: React.FC = () => {

        return (
            <Properties.Component>
                <Theme.Component>
                    <BrowserRouter>
                        <Header.Component>
                            <Routes.Component />
                        </Header.Component>
                    </BrowserRouter>
                </Theme.Component>
            </Properties.Component>
        );
    }

}
