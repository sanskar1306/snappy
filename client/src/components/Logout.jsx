import React from 'react'
import styled from 'styled-components'
import { BiPowerOff } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    }
  return (
      <Button onClick={handleClick}>
        <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
   
        padding:0.8rem;
        border-radius: 0.5rem;
        background-color: #9a86f3;
        color: white;
        cursor: pointer;
    
`

export default Logout