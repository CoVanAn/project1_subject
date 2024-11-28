import React from "react";
import './Home.css';
import Header from '../../components/Header/Header';
import OrderFlight from "../../components/OrderFlight/OrderFlight";
import Footer from "../../components/Footer/Footer";

const Home = () => {
    return (
        <div>
            <div className="Header">
                <Header />
                {/* <div>
                    <h2>Start Booking Your Flight Now</h2>
                    <p>Find countless flights options & deals to various destinations around the world.</p>
                </div> */}
                
                <OrderFlight />
                <Footer />
            </div>
        </div>
    );
};

export default Home;