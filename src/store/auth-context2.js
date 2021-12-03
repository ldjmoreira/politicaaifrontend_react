import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  state: {},
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  console.log('AQUI3')
  console.log(adjExpirationTime)
  console.log(currentTime)
  return remainingDuration;
};

const retrieveStoredToken = () => {//
  const json = localStorage.getItem('setUser');
  const storedToken = JSON.parse(json)


  if(!storedToken) {
    return null
  }



  const remainingTime = calculateRemainingTime(storedToken.exp);  

  console.log('AQUI2')
  console.log(remainingTime)
  
  if (remainingTime <= 1000) {
    localStorage.removeItem('setUser');
    
    return null;
  }

  return {
    name: storedToken.name,
    email: storedToken.email,
    admin: storedToken.admin,
    token: storedToken.token,
    exp: storedToken.exp,
    duration:remainingTime
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  console.log(tokenData)

  let initialToken;

  if (tokenData) {
    console.log("olaa")
    initialToken = tokenData;
  } else {
    initialToken = {
      name: '',
      email: '',
      admin: false,
      token: '',
      exp: 0,
    }
  }
//
  let userIsLoggedIn = !!initialToken.exp;
  let name = initialToken.name
  let tokenn = initialToken.token
  let admin = initialToken.admin

  console.log(initialToken)
  
  const [state, setState] = useState((prevState) => {
  return {...prevState,...initialToken }

  } );
//

  
//  const userIsLoggedIn = !!state.token;
//console.log(state.token);
  const logoutHandler = useCallback(() => {
    setState(null);
    localStorage.removeItem('setUser');
   
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

  }, []);

  const loginHandler = (stateComing, expirationTime) => {
    
    
    localStorage.setItem('setUser', JSON.stringify({
      name: stateComing.name,
      email: stateComing.email,
      admin: stateComing.admin,
      token: stateComing.token,
      exp: expirationTime
    }));

    
    
    setState({
      name: stateComing.name,
      email: stateComing.email,
      admin: stateComing.admin,
      token: stateComing.token,
      exp: expirationTime
    });
    
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
    
    

    
  };
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  console.log("legal") // myname
  console.log(userIsLoggedIn)

  const contextValue = {
    name: name,
    token:tokenn ,
    admin: admin,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;