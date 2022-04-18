import React from "react";

global.console.warn = (message) => {
    throw message;
};

global.console.error = (message) => {
    throw message;
};

//HACK: jest does not support jsx/react18 syntax
global.React = React;
