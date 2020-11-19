import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './cart.css';
import ConfirmModal from '../modal/confirmModal';


export default function FooterCart(props){

    const [checkBoxConfirm, setCheckBoxConfirm] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    //const [clickAgreementButton, setClcikAgreementButton] = useState(true);

    useEffect(() => {
        console.log(checkBoxConfirm);
    }, [checkBoxConfirm]);


    // order submission method
    const submitOrder = (event) => {
        event.preventDefault();
        console.log(event.target[0].checked);

        if(event.target[0].checked){
            setCheckBoxConfirm(true);    // checkbox must be checked for checkout
            axios.post('http://localhost:4000/order/post/user', {item_price: props.totalPaymentAmount})
            .then(response => {
                console.log(response);
                setOpenModal(response.data.status);   //for open modal window for confirm order
            })
            .catch(error => console.log(error));
        }
        else setCheckBoxConfirm(false);
    }


    //checkbox value status change handler
    const checkboxChangeHandler = (event) => {
        if(event.target.checked){
            setCheckBoxConfirm(true);
        }
        else setCheckBoxConfirm(false);
    }
    

    // for reminder that must check the checkbox
    const agreementInvalid = () => {
        if(checkBoxConfirm) return '';
        return <div class="text-danger mt-3"><small>Click the checkbox to confirm order.</small></div>
    }

    // closing modal window
    const closeModal = (status) => {
        setOpenModal(false);
      }

    return(
        <div>
        <ConfirmModal openModal={openModal} closeModal={closeModal}/>
        <form onSubmit={submitOrder}>
        <div className="row small-size-display m-4 d-flex bg-white">
        
            <div class="col-1 text-center p-3">
                <input onChange={checkboxChangeHandler} name="confirm" id="confirm" className="ml-4 same-line" style={{ transform: "scale(1.5)"}} type="checkbox"/>
            </div>
            
            {agreementInvalid()}

            <div className="ml-4 same-line col-6 text-left p-3">
                <small>I agree with the terms and condition, privacy policy and refund policy.</small>
            </div>
            
            <div className="ml-auto col-3 left-small same-line text-center">
                <button  type="submit" className="btn m-2 text-center">Checkout</button> 
            </div>
        
        </div>
        </form>
        </div>
    );
}