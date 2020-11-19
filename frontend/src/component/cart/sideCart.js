import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './cart.css';

export default function SideCart(props){

    const [totalItem, setTotalItem] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalPricePayable, setTotalPricePayable] = useState();
    const [totalDiscount, setTotalDiscount] = useState();
    const [totalShippingCharge, setTotalShippingCharge] = useState();
    const [promoCode, setPromoCode] = useState('');
    const [validPromo, setValidPromo] = useState(true);
    const [promoDiscount, setPromoDiscount] = useState(0);

    useEffect(() => {
        //console.log(promoCode);
        setTotalItem(props.totalItem);
        setTotalPrice(props.totalPrice);
        setTotalDiscount(props.totalDiscount);
        setTotalShippingCharge(props.totalShippingCharge);
        setTotalPricePayable(props.totalPrice + props.totalShippingCharge - props.totalDiscount);
    });

    const promoCodeHandler = (e) => {
        //console.log(e.target.value);
        setPromoCode(promo => e.target.value);
    }

    const submitPromoCode = (event) => {
        event.preventDefault();
        //console.log(event.target.promo_code.value);
        axios.get('http://localhost:4000/user/cart/getpromo?promo_code=' + promoCode)
        .then(response => {
            if(response) {
                //console.log(response);
                if(response.data.discount){
                    setPromoDiscount(response.data.discount);
                }
                setValidPromo(response.data.message);
            }
        })
        .catch(error => console.log(error));
        setValidPromo(prev => !prev);
    }

    const invalidPromo = () => {
        //console.log(validPromo);
        if(!validPromo) return <div className="text-danger">Invalid code</div>
        return '';
    }

    return(
        <div className="bg-white">
            <table className="table border-none">
                <tr>
                    <td className="text-center">Order summary</td>
                </tr>
                <tr>
                    <td>Subtotal ({totalItem} items)</td>
                    <td className="text-right">BDT. {totalPrice}</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td className="text-right">BDT. {totalDiscount + totalPricePayable * promoDiscount / 100}</td>
                </tr>
                <tr>
                    <td>Shipping charge</td>
                    <td className="text-right">BDT. {totalShippingCharge}</td>
                </tr>
                <tr>
                    <td>Wallet Debit</td>
                    <td className="text-right">BDT. 0</td>
                </tr>
            </table>
            <div >
                <form onSubmit={submitPromoCode}>
                    <input 
                        onChange={e => promoCodeHandler(e)} 
                        className="same-line" 
                        name="promo_code" 
                        id="promo_code" 
                        style={{width: "130px"}} 
                        type="text"
                        value={promoCode} 
                        placeholder="promo code"
                    />
                    
                    <button type="submit" className="same-line">Apply</button>
                    {invalidPromo()}
                </form>
            </div>
            <div class="d-flex mt-4  mr-2 ml-2">
                <div>Total Payable</div>
                <div className="ml-auto mb-4">BDT. {totalPricePayable - totalPricePayable * promoDiscount / 100}{props.totalPayment(totalPricePayable - totalPricePayable * promoDiscount / 100)}</div>
            </div>
            
        </div>
    );
}