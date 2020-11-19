import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'grey'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('showcart'))
 
export default function ConfirmModal(props){
  var subtitle;
  const [modalIsOpen,setIsOpen] = useState(false);

  useEffect(() => {
      console.log('false is false');
    setIsOpen(props.openModal);
  });

  function showModal(){
      
          return (
            <div onClick={()=>props.closeModal(false)}>
            
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              contentLabel="Example Modal"
              
            >
              <div>
                <span class="material-icons">
                    check_circle
                </span>
              </div>
              
              <div>Your product added successfully</div>
            </Modal>
          </div>
          );
      
  }
 
    return (

        <div>{showModal()}</div>
      
    );
}

//ReactDOM.render(<ConfirmModal />, appElement);