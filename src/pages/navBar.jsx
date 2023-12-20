import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate()
  const handleClick = (ref) => {
    navigate(`${ref}`)
  }
  
  return (
    <div className='bg-secondary navstyle'>
 
      <ul className="nav d-flex justify-content-center">
        <li className="nav-item">
          <a className="nav-link text-info" onClick={() => handleClick('/signup')} style={{ cursor: "pointer" }}>Sign up</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-info" onClick={() => handleClick('/')} style={{ cursor: "pointer" }}>Log in</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-info" onClick={() => handleClick('/logout')} style={{ cursor: "pointer" }}>Log out</a>
        </li>

      </ul>
    </div>
  )
}