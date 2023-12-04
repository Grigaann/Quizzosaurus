import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import SimiliCheckBox from "../../util/SimiliCheckBox";
import { editprofile } from "../../Controllers/Auth";
import Footer from '../PublicRoutes/footer';
import Header from '../PublicRoutes/header';

export default function EditProfile() {
    const [loading, setLoading] = useState(false);
    const [displayPwds, setDisplayPwds] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currPwd, setCurrPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confPwd, setConfPwd] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
                axios.get('http://localhost:8080/api/validateToken', { withCredentials: true }).then(async response => {
                    const resp = await axios.post(`http://localhost:8080/api/checkUser/${response.data.tokenID}`);
                    setUsername(resp.data.user.username);
                    setEmail(resp.data.user.email);
                });
            } catch (err) { console.log(err); }
        }
        fetchData()


    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (displayPwds && (newPwd !== confPwd)) {
            alert('Passwords do not match!');
            return;
        }
        await editprofile({ user: { username, email, currPwd, newPwd } }, displayPwds, setError);
        setLoading(false);
    }

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit}>
                <h1>Edit your profile data</h1>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete='off' required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete='off' required />
                </label>
                {/* <input type="checkbox" checked={displayPwds} onChange={()=> setDisplayPwds(!displayPwds)} /> */}
                <SimiliCheckBox text=" Change password" active={displayPwds} effect={setDisplayPwds} />
                {displayPwds && <>
                    <label>
                        Current password:
                        <input type="password" value={currPwd} onChange={(event) => setCurrPwd(event.target.value)} autoComplete='off' />
                    </label>
                    <label>
                        New Password:
                        <input type="password" value={newPwd} onChange={(event) => setNewPwd(event.target.value)} autoComplete='off' />
                    </label>
                    {newPwd && <label>
                        Confirm password:
                        <input type="password" value={confPwd} onChange={(event) => setConfPwd(event.target.value)} autoComplete='off' />
                    </label>}
                </>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>Save changes</button>
            </form>
            <section>
                <Link to='/profile'>Discard changes</Link>
            </section>
            <Footer />
        </>
    )
}