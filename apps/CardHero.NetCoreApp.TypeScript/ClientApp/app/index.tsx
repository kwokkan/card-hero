import React from "react";
import { render } from "react-dom";
import { AppBootstrap } from "../components/shared/AppBootstrap";
import { MainApp } from "./MainApp";

render(
    <MainApp />,
    AppBootstrap.rootElement
);
