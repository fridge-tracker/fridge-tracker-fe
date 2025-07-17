import PageHeading from "../PageHeading.jsx";
import {useNavigate} from 'react-router-dom';
import fridge from '../../assets/fridge.svg'

const Home = ()=>{
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <PageHeading/>
            <img
                src={fridge}
                style={{
                    width: '500px',
                    height: 'auto'
                }}

                alt="Fridge icon"
            />

            <button className="styledButton" onClick={() => navigate('/goods')}>
                My goods
            </button>


        </div>
    );
};

export default Home