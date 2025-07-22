import fridge from '../assets/fridgesmall.svg'
import {Link} from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web';


const Header = ()=>{
    const { keycloak } = useKeycloak();
    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="link">
                    <img src={fridge} alt="Fridge icon" className="icon"/>
                    <span className="app-title">Fridge Tracker</span>
                </Link>
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/home" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li>
                            {keycloak.authenticated? (
                                    <Link
                                        className="nav-link"
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent default navigation
                                            keycloak.logout({ redirectUri: import.meta.env.VITE_FE_BASE_URL });
                                        }}
                                        role="button"
                                    >
                                        Logout
                                    </Link>

                                )
                            :(
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>)}
                        </li>
                        <li>
                            {keycloak.authenticated &&
                                <Link
                                    className="nav-link"
                                    to="/goods"
                                >
                                    {keycloak.tokenParsed?.given_name + " " + keycloak.tokenParsed?.family_name}
                                </Link>
                                }
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
export default Header;