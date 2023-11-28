import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logout,deleteUser } from '../../Controllers/Auth';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const ChgPwd = () => navigate('/editprofile');

    const logOut = async () => navigate(await logout());

    const DeleteAccount = async () => navigate(await deleteUser());

    // useEffect(() => {
    //     axios.post('http://localhost:8080/api/checkUser', (err, response) => {
    //         if (err) throw err;
    //         if (response) {
    //             setUsername(response.data.user.username);
    //             setEmail(response.data.user.email);
    //         }
    //     });
    // });

    return (
        <>
            <section>
                <h1>Profile</h1>
                {/* <Link to={ <EditProfile />}>Edit profile</Link> */}
                <h3>Username</h3>
                <p>{username}</p>
                <h3>E-mail</h3>
                <p>{email}</p>
                <button onClick={ChgPwd}>Change password</button>
                <button onClick={logOut}>Log out</button>
                <button color='red' onClick={DeleteAccount}>Delete account</button>
            </section>
        </>
    )
}