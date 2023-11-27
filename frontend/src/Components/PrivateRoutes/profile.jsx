import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const ChgPwd = () => {
        navigate('/editprofile');
    }

    const Logout = () => {
        navigate('/authenticate');
    }

    const DeleteAccount = () => {
        navigate('/authenticate');
    }
    

    return(
        <>
            <section>
                <h1>Profile</h1>
                {/* <Link to={ <EditProfile />}>Edit profile</Link> */}
                <h3>Username</h3>
                <p>{ username }</p>
                <h3>E-mail</h3>
                <p>{ email }</p>
                <button onClick={ ChgPwd }>Change password</button>
                <button onClick={ Logout }>Log out</button>
                <button color='red' onClick={ DeleteAccount }>Delete account</button>
            </section>
        </>
    )
}