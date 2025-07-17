import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Register, { registerAction }  from "./components/Register.jsx";
import Home from "./components/home/Home.jsx";
import Goods from "./components/Goods.jsx"
import {Bounce, ToastContainer} from "react-toastify";

import PrivateRoute from "./components/PrivateRoute.jsx";
import {ReactKeycloakProvider} from '@react-keycloak/web'
import keycloak from "./components/keycloak/keycloak.js"


const routeDefinitions = createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>} action={registerAction} />
        <Route path="/goods" element={
            <PrivateRoute>
                <Goods/>
            </PrivateRoute>
        }/>
    </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);


createRoot(document.getElementById('root')).render(
    <ReactKeycloakProvider authClient={keycloak}
                           initOptions={{
                               checkLoginIframe: false,
                               onLoad: 'check-sso'
                           }}>
        <RouterProvider router={appRouter}
        />
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            draggable={true}
            pauseOnHover={true}
            theme={"dark"}
            transition={Bounce}
        />
    </ReactKeycloakProvider>
)
