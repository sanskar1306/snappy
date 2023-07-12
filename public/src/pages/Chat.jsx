import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Welcome from "../components/Welcome";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(
          localStorage.getItem('chat-app-user')
        )
      );
    }
  }, []);


  async function fetchContacts() {
    try {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
          console.log(data)
        } else {
          navigate("/setAvatar");
        }
      }
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    fetchContacts();
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentUser(chat)
  }
  return (
    <>
      <Container>

        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          <Welcome />
        </div>

      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

