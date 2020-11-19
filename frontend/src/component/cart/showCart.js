import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SingleCartItem from './singleCartItem';
import './cart.css';
import FooterCart from './footerCart';
import SideCart from './sideCart';
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function ShowCart(){

    const [cartItem, setCartItem] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalShippingCharge, setTotalShippingCharge] = useState(0);
    const [keyValue, setKeyValue] = useState(0);
    const [deleteKeyValue, setDeleteKeyValue] = useState(0);
    const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:4000/user/cart/getcartitem')
        .then(response => {
            //console.log(response.data);
            setCartItem(response.data);
            setTotalPrice(0);
            setTotalItem(0);
            setTotalDiscount(0);
            setTotalShippingCharge(0);
            response.data.map(singleData => {
                setTotalItem(prev => prev + singleData.quantity);
                setTotalPrice(prev => prev + singleData.product_price * singleData.quantity);
                setTotalDiscount(prev => prev + singleData.product_price * singleData.quantity*singleData.discount_rate/100);
                setTotalShippingCharge(prev => prev + singleData.shipping_charge*singleData.quantity);
            });
        })
        .catch(error => console.log(error));
        
    }, [keyValue, deleteKeyValue]);

    const deleteHandler= (id) => {
        axios.delete('http://localhost:4000/user/cart/deletecartitem?_id=' + id)
        .then(response => {
            //console.log(response);
            setDeleteKeyValue(prev => prev + 1);
            setCartItem(response.data);
        })
        .catch(error=>{
            console.log(error);
        });
    }

    const onValueChange = () => {
        setKeyValue(prev => prev + 1);
    }

    const totalPayment = (taka) => {
        setTotalPaymentAmount(taka);
    }

    

    return (
        <div class="border-box ml-4" id="showcart">
            <div className="content-left">
                <button class="button-design ml-4 mb-4"><strong>Go back</strong></button>
                {
                 cartItem.map((item,index) =>{
                     
                    return <SingleCartItem onValueChange={onValueChange} deleteHandler={deleteHandler} item={item}/>
                    })
                } 
                <FooterCart totalPaymentAmount={totalPaymentAmount}/>
            </div>
            <div className="content-right">
                <SideCart totalItem={totalItem} totalPrice={totalPrice} totalDiscount={totalDiscount} totalShippingCharge={totalShippingCharge} totalPayment={totalPayment}/>
            </div>
            
        </div>  
    );
}