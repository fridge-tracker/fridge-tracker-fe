import './App.css'
import Header from "./components/header/Header.jsx"
import Footer from "./components/footer/Footer.jsx";
import React, {Fragment} from "react";
import {Outlet} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

function App() {
    const { initialized } = useKeycloak();

    if (!initialized) {
        console.log("Loading...");
    }


    return (
            <Fragment>
                <Header/>
                    <Outlet/>
                <Footer/>
            </Fragment>

    )
}

export default App
