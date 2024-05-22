import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/cases';

export default function CurrentTrack() {
    const [{ token, currentlyPlaying },dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
          const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          if (response.data !== "") {
            const currentlyPlaying = {
              id: response.data.item.id,
              name: response.data.item.name,
              artists: response.data.item.artists.map((artist) => artist.name),
              image: response.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });

          } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
          }
        };
        getCurrentTrack();
      }, [token, dispatch]);

  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentlyplaying.." />
          </div>
          <div className="track__info">
            <div className='track__info__track__name'>{currentlyPlaying.name}</div >
            <div className='track__info__track__artists'>{currentlyPlaying.artists.join(", ")}</div>
          </div>
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
.track {
  display: flex;
  align-items: center;
  gap: 1rem;
  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    &__track__name {
      color: white;
      font-size: 18px;
      font-weight: 500;
    }
    &__track__artists {
      color: #b3b3b3;
    }
  }
}`;