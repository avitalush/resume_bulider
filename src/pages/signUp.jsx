import React, { useContext, useState } from 'react'
import ResumesContext  from '../context/resumes'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigate=useNavigate()
    const {register}=useContext(ResumesContext)
    const [data, setData] = useState({
        email: '',
        password: '',
        role: 'user'
    })
    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }

    const handleSignUp = () => {
        register(data)
        navigate('/')
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
        <div className="App-header card" style={{width: "25rem"}}>
            <div className='list-group list-group-flush'>
            <input
                placeholder="Email"
                name="email"
                type="email"
                className="input-fields list-group-item m-3"
                onChange={event => handleInputs(event)}
            />
            <input
                placeholder="Password"
                name="password"
                type="password"
                className="input-fields list-group-item m-3"
                onChange={event => handleInputs(event)}
            />

            <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
        </div>
    )
}