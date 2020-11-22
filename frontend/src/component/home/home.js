import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import Product from './product';
function Home() {

    const [products, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState();

    useEffect(()=>{

        axios.get('http://localhost:4000/user/cart/getcartitem')
        .then(response => {
            console.log(response.data.length);
            setCartItem(response.data.length);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:4000/user/getuserproducts')
        .then(response => {
            //console.log(products.data);
            setProducts(response.data);
            //console.log(response.data);
        })
    }, []);

    const productFunction = (product) => {
        console.log(product.product_name);
    }

    const increamentCartProduct = () => {
        setCartItem(prev => prev+1);
    }


    return ( 
        <div>
        <div>
        <Navbar cartItem={cartItem}/>
        </div>
        <div class="border-box">
        
                {products.map((product,index) =>{
                    return (product.active === "yes") ? <Product increamentCartProduct={increamentCartProduct} product={product}/> : ""
                })
                    
                }
        </div>
        </div>  
    );
}

export default Home;
