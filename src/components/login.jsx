import React, { useContext, useState } from 'react'
import  ResumesContext  from '../context/resumes';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



export default function Login() {
    const { logInUser ,getUserByEmail} = useContext(ResumesContext);
    const auth = getAuth();

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }

    const logIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                console.log(response.user)
                 getUserByEmail(response.user.email)
                 navigate('/list')
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message)
            });
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

            <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={logIn}>Log In</button>
            </div>
        </div>
        </div>

    )
}