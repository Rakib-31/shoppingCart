import React from 'react';
import Navbar from './component/navbar/navbar';
import Home from './component/home/home';
import ShowCart from './component/cart/showCart'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
 
          <div style={{marginTop: "10%"}}>
            <switch>
              <Route path="/cartitem" component={ShowCart}/>
              <Route path="/" exact component={Home}/>
            </switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
