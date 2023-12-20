import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import  ResumesContext  from '../context/resumes';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
    const { auth } = useContext(ResumesContext);
    const navigate = useNavigate();
    const handlelogout = () => {
        signOut(auth).then(() => {
            console.log(auth);
            navigate("/")
        }).catch((error) => {
            console.log(error);
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

            <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={handlelogout}>Log out</button>
            </div>
        </div>
        </div>

    )
}