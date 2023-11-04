// Import necessary dependencies 
import React, { useEffect, useState } from 'react';
import runningImg from "../../misc/run.png"
import Loader from '../../../components/loader/Loader';
import style from './Hero.module.css';

import { authSelector, getInitialUserList, setLoggedIn, setUserLoggedIn} from '../../../redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialCartOrdersThunk } from '../../../redux/reducers/courseReducer';


// Hero Page
function Hero() {

  const dispatch = useDispatch();
  const [isLoading,setLoading]= useState(true);
  const { isLoggedIn, userLoggedIn } = useSelector(authSelector);

  // Use an effect to check for user authentication and retrieve user data from local storage
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    const token = window.localStorage.getItem("token");

    if(token){
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);

      dispatch(setLoggedIn(token));
      dispatch(setUserLoggedIn(user));
    }
  }, [])

  // Fetch the initial user list from the server when the login status changes
  useEffect(() => {
    dispatch(getInitialUserList());
  },[isLoggedIn]);

  // Fetch the initial cart orders for the user when the user data changes
  useEffect(() => {
    dispatch(getInitialCartOrdersThunk());
  }, [userLoggedIn])

  
  return (
    <>
    {/* Loading Screen Condition */}
    {isLoading ? 
    (<Loader />): 
    (
      <header>
      <section className={style.logo_wrapper}>
        <img
          className={style.logo}
          src={runningImg}
          alt='logo'
        />
      </section>
      <section className={style.content}>
        <h4>Are you ready to</h4>
        <h1>Start Learning ?</h1>
        <p>
          See how experienced developers solve problems in real-time. Watching scripted
          tutorials is great, but understanding how developers think is invaluable.
        </p>
      </section>
    </header>
    )}
    </>
  );
}

export default Hero;
