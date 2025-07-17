import {useKeycloak} from '@react-keycloak/web';

const PrivateRoute = ({children}) => {
    const {keycloak, initialized} = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        keycloak.login();
        return <div>Redirecting to login...</div>;
    }


    return children;
};

export default PrivateRoute;

