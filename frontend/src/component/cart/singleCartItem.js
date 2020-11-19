import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './cart.css';
import SideCart from './sideCart';

export default function SingleCartItem(props) {
    
    const [numberOfItem, setNumberOfItem] = useState(props.item.quantity);

    useEffect(() => {
        axios.post('http://localhost:4000/user/cart/updatecartitem?_id='+props.item._id, {quantity: numberOfItem});
        //setNumberOfItem(props.item.quantity);
    },[numberOfItem]);

    const incrementItemHandler = () => {
        // if(!numberOfItem) return;
        setNumberOfItem(prev => prev + 1);
        
    }

    const decrementItemHandler = () => {
        if(!numberOfItem) return;
        setNumberOfItem(prev => prev - 1);
        
    }

    const totalPrice = () => {
        return numberOfItem * (props.item.shipping_charge + props.item.product_price);
    }

    return(
        <div class="under-navbar mt-1 ml-4 single-cart-size"  >
            
            
            <div class="">
                <div className="row margin-item">
                <div className="m-4">
                    <img class="size-image" src={props.item.image}/>
                </div>
                    <div className=" text-left margin-item mt-4">
                        <p>{props.item.product_name}</p><br/>
                        <p><pre><small>Color: {props.item.color}    Size: {props.item.size}</small></pre></p>
                        <p><small>Product Price: BDT. {props.item.product_price}</small></p>
                    </div>
                    <div className=" text-left margin-item mt-4">
                        <p style={{color: "white"}}>diplay-none</p><br/>
                        <p><small>Shipping Method: {props.item.shipping_method}</small></p>
                        <p><small>Shipping Charge: BDT. {props.item.shipping_charge}</small></p>
                    </div>
                    <div className="margin-item mt-4 " >
                        <div onClick={()=>props.deleteHandler(props.item._id)} className="text-right" style={{cursor: "pointer"}}><span class="material-icons same-line">
                            delete_outline
                        </span></div><br/>
                        <div className="text-center">
                            <p  className="same-line">
                                <small>Quantity: </small>
                            </p>
                            <p className="span-design ml-4">
                                <span onClick={()=>{incrementItemHandler(); props.onValueChange()}} className="mr-2">+</span>
                                {numberOfItem}
                                <span onClick={()=>{decrementItemHandler(); props.onValueChange()}} className="ml-2">-</span>
                            </p>
                        </div>
                        <p className="text-center"><small>Total Price: BDT. {numberOfItem * (props.item.shipping_charge + props.item.product_price)}</small></p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}