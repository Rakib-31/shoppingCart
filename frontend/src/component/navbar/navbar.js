import React, {useState, useEffect} from 'react';
import './navbar.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

function App() {

    const [cartItem, setCartItem] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:4000/user/cart/getcartitem')
        .then(response => {
            console.log(response.data.length);
            setCartItem(response.data.length);
        })
        .catch(error => console.log(error));
    })

  return (

    <nav  className="border-box  bg-white">
        <div className="container">
        <div className="row navpad">
            <div className="col-3"><h5 className="btn"><Link style={{color: "black"}} to="/"> Test Logo</Link></h5></div>
            
            <input className="col-4 input-clas" value="" placeholder="Serch"/>
            
            <Link className="text-right col-5" style={{color: "black"}} to="/cartitem">
                <span style={{ display: "inline-block"}} class="material-icons">
                shopping_cart
                </span>
                <p className="ml-2 text-right" style={{ display: "inline-block"}}>Cart</p>
                <button className="ml-1 text-right cart-button">{cartItem}</button>
            </Link>
            
        </div>
        </div>
    </nav>
  );
}

export default App;
