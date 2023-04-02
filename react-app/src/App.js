import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllProducts from "./components/Product";
import SingleProduct from "./components/Product/singleProduct";
import Cart from "./components/Cart";
import Order from "./components/Orders";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <AllProducts/>
          </Route>
          <Route exact path='/products/:id' >
            <SingleProduct />
          </Route>
          <Route exact path='/cart'>
          <Cart />
          </Route>
          <Route exact path='/order'>
            <Order />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
