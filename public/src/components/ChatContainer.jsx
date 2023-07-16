import React,{useState} from 'react'
import styled from 'styled-components'
function ChatContainer({currentChat}) {
  return (
      <Container>
          <h1>{currentChat.username}</h1>
    </Container>
  )
}

const Container =  styled.div`
    h1{
        color: white;
    }
`

export default ChatContainer