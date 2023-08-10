import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import VideoCall from './VideoCall'
import ChatInput from './ChatInput'
import { v4 as uuidv4 } from "uuid";
import { encryptMessage, decryptMessage } from "../aes.js";
import { sendMessageRoute, recieveMessageRoute } from '../utils/APIRoutes'
import axios from 'axios'
function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const deCryptMessages = async (messages) => {

    for (let element of messages) {
      // Alter the element here

      const mess = decryptMessage(element.message)
      element.message = mess;
    }

  }
  const getMessages = async () => {
    const data = await JSON.parse(
      localStorage.getItem('chat-app-user')
    );
    // console.log(data)
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    // console.log(response)
    await deCryptMessages(response.data)
    setMessages(response.data);
  }

  useEffect(() => {
    getMessages()
  }, [currentChat])

  const handleSendMsg = async (msg) => {
    const ans = await encryptMessage(msg);

    const data = await JSON.parse(
      localStorage.getItem('chat-app-user')
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      message: ans,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: ans
    })
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  }


  async function UpdateArrMsg() {
    // console.log("ffabfhahf")
    if (socket.current) {
      socket.current.on("msg-receive", async (mess) => {
        // console.log(mess)
        const ans1 = await decryptMessage(mess.message);

        mess.message = ans1;
        setArrivalMessage(mess);
      });

    }
  }
  useEffect(() => {
    UpdateArrMsg();
  }, []);

  useEffect(() => {
    // console.log(arrivalMessage)
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className='avatar'>
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username" >
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <div className='butts'>
          <VideoCall />
          <Logout />
        </div>

      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div className={`message ${message.fromSelf ? "sended" : "recieved"}`} >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>

          );
        })}

      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
    display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    margin-top:1rem;
    .butts{
      display:flex;
      gap:0.5rem;
    }
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`

export default ChatContainer