import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './home.css';
import axios from 'axios';

function Product(props){

    const addToCart = () => {
        let ob = {
            image: props.product.image,
            product_name: props.product.product_name,
            product_price: props.product.product_price,
            discount_rate: props.product.discount_rate,
            quantity: 1,
            size: props.product.size,
            shipping_charge: props.product.shipping_charge,
            shipping_method: 'EMS',
            color: props.product.color

        }

        axios.post('http://localhost:4000/user/cart/postitem', ob)
        .then(response => {
            console.log('successfully save on cart from frontend');
        })
        .catch(error => console.log(error));
    }
    return(
        <div className="hoverover">
            <div className="underover">
            <div className="card ml-3">
            <img  className="card-img-top image" src={props.product.image} alt="Card image"/>
            
            <div className="card-body">
                <small className="card-title">{props.product.product_name}</small>
            </div>
            <div className="card-footer bg-white">
                
                <p style={{display: "inline-block"}}><strong>BDT. {props.product.product_price}</strong></p>
                <p style={{display: "inline-block", backgroundColor: "yellow"}} className="float-right"><strong>{props.product.discount_rate}%</strong></p>
            </div>
        </div> 
            </div>
            <div className="overlay">
            <button class="button-hover" onClick={()=>addToCart()}>Add to cart</button>
            </div>
        </div>
    );
}

export default Product;