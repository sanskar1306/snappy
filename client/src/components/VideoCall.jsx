import React from 'react'
import styled from 'styled-components'
import { BsCameraVideo } from 'react-icons/bs'

function VideoCall() {

    const handleClick = async () => {
        console.log("Video call started")
    }
  return (
      <Button onClick={handleClick}>
          <BsCameraVideo />
      </Button>
  )
}

export default VideoCall;

const Button = styled.button`
     padding:0.8rem;
        border-radius: 0.5rem;
        background-color: #9a86f3;
        color: white;
        cursor: pointer;
`