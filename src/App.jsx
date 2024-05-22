import React, { useEffect } from 'react'
import Login from './components/Login'
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/cases';
import Spotify from './components/Spotify';
import Body from './components/Body';


export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(()=>{
    const hash = window.location.hash;
    if(hash){
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if(token){
        dispatch({type: reducerCases.SET_TOKEN, token})
      }
    }
  },[dispatch,token]);
  return (
    <div>{token ? <Spotify/> : <Login/>}</div>
  )
}
