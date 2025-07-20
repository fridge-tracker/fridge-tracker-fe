import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Register, { registerAction }  from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Goods from "./components/good/Goods.jsx"
import {Bounce, ToastContainer} from "react-toastify";

import PrivateRoute from "./components/PrivateRoute.jsx";
import {ReactKeycloakProvider} from '@react-keycloak/web'
import keycloak from "./keycloak/keycloak.js"
import EditGood, {updateAction} from "./components/good/EditGood.jsx";
import AddGood, {addAction} from "./components/good/AddGood.jsx";


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
        <Route path="/addGood" element={
            <PrivateRoute>
                <AddGood/>
            </PrivateRoute>
        } action={addAction}/>
        <Route path="/editGood" element={
            <PrivateRoute>
                <EditGood/>
            </PrivateRoute>
        } action={updateAction}/>
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
            enableHtml={true}
        />
    </ReactKeycloakProvider>
)
