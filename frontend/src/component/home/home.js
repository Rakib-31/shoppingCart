import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Product from './product';
function Home() {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
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


    return ( 
        <div class="border-box">
        
                {products.map((product,index) =>{
                    return <Product product={product}/>
                })
                    
                }
        </div>  
    );
}

export default Home;
