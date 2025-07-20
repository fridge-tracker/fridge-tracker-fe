import './App.css'
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx";
import React, {Fragment} from "react";
import {Outlet} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

function App() {
    const { initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
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
