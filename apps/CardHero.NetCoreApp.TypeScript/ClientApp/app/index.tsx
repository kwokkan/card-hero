import React from "react";
import { render } from "react-dom";
import { CardHeroApiClientBase } from "../clients/CardHeroApiClientBase";
import { AppBootstrap } from "../components/shared/AppBootstrap";
import { MainApp } from "./MainApp";

CardHeroApiClientBase.baseUrl = AppBootstrap.baseUrl;

render(
    <MainApp />,
    AppBootstrap.rootElement
);
