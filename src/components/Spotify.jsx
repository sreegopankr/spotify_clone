import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SideBar from './SideBar';
import NavBar from './NavBar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/cases';

export default function Spotify() {
    const [{token}, dispatch] = useStateProvider();
    const bodyRef = useRef();
    const [navBackground,setNavBackground] = useState(false);
    const [headerBackground,setHeaderBackground] = useState(false);
    const handleScroll = ()=>{
        bodyRef.current.scrollTop >=30? setNavBackground(true): setNavBackground(false)
        bodyRef.current.scrollTop >=270? setHeaderBackground(true): setHeaderBackground(false)
    }
    useEffect(()=>{
        const getUserInfo = async ()=>{
            const { data } = await axios.get("https://api.spotify.com/v1/me",{
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                  },
            })
            const userInfo = {
                userId: data.id,
                name: data.display_name
            }
            dispatch({type: reducerCases.SET_USER, userInfo})
        }
        getUserInfo();
    },[token,dispatch])
  return (
    <Container>
        <div className="spotify__body">
            <SideBar/>
            <div className="body" ref={bodyRef} onScroll={handleScroll}>
                <NavBar navBackground={navBackground}/>
                <div className="body__contents">
                    <Body headerBackground={headerBackground}/>
                </div>
            </div>
        </div>
        <div className="spotify__footer">
            <Footer/>
        </div>
    </Container>
  )
}

const Container = styled.div`
    max-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    display: grid;
    grid-template-rows: 85vh 15vh;
    .spotify__body{
        display: grid;
        grid-template-columns: 15vw 85vw;
        height: 100%;
        width: 100%;
        background: linear-gradient(transparent,rgba(0,0,0,1));
        background-color: rgb(32,87,100);
        .body {
            height: 100%;
            width: 100%;
            overflow: auto;
            &::-webkit-scrollbar {
              width: 0.7rem;
              max-height: 2rem;
              &-thumb {
                background-color: rgba(255, 255, 255, 0.6);
              }
            }
          }
    }`;


