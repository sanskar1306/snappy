import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import axios from "axios";

export default function SetAvatar() {
  const navigate = useNavigate();
  const api = "http://localhost:5000/api/avatars/getavatars";

  const [avatars, setAvatars] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
  };
  
  useEffect(() => {
    const user =  JSON.parse(
      localStorage.getItem("chat-app-user")
    );
    if (!user) navigate("/login");
    if (user.isAvatarImageSet) navigate("/");
      
  }, []);
  async function fetchImage() {
    try {
      setLoading(true);

      const data1 = await axios.get(api);
      const x = data1.data;
      const data = [];
      for (let i = 0; i < 6; i++) {
        const buffer = new Buffer(x[i]);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching images", error?.message || "");
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchImage();
  }, []);

    async function setProfilePicture() {
        try {
            if (selectedAvatar === undefined) {
                toast.error("Please select an avatar", toastOptions);
            }
            else {
              
                const user = await JSON.parse(
                    localStorage.getItem("chat-app-user")
              );
              console.log(user)
              const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
              });
                console.log(data)
                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem(
                        'chat-app-user',
                        JSON.stringify(user)
                    );
                    navigate("/");
                } else {
                    toast.error("Error setting avatar. Please try again.", toastOptions);
                }
            }
            
        } catch (error) {
           toast.error("Some error",toastOptions) 
        }
    }
    
    
  return (
    <>
      {!loading && avatars && Array.isArray(avatars) ? (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture.</h1>
          </div>
          <div className="avatars">
            {avatars?.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
                  </div>
                  <button onClick={setProfilePicture} className="submit-btn">
                      Set as Profile Picture
                  </button>
          <ToastContainer />
        </Container>
      ) : (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #131324;

  .loader {
    max-inline-size: 100%;
  }

  .title-container{
    text-align:center ;
    h1{
        color:white;
    }
  }
  .avatars {
     border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 1s ease-in-out;
      img {
        height: 6rem;
        transition: 1s ease-in-out;
      }
      .selected {
      border: 0.4rem solid #4e0eff;
      border-radius: 4rem;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
