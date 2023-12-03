import axios from 'axios';
import bcrypt from 'bcryptjs';

async function hashing(pwd) {
    return await bcrypt.hash(pwd, await bcrypt.genSalt(10));
}

/* ============ SIGN IN function ============ */

export const register = async (user, setError) => {
    try {
        const avlbl = await axios.post(`http://localhost:8080/api/checkUser/${null}`, { username: user.usrnm, email: user.eml });
        if (!avlbl.data.available) {
            setError('Username or email is already taken!');
            return;
        } else {
            const response = await axios.post('http://localhost:8080/api/signup', {
                username: user.usrnm,
                email: user.eml,
                password: await hashing(user.pwd)
            });
            if (response.data.redirection) {
                console.log('Registration successful!');
                window.location.assign(response.data.redirection);
            } else {
                console.log('Registration failed.');
            }
        }
    } catch (error) {
        console.error('Registration failed:', error.message);
        setError('Registration failed. Please try again.');
    }
}

/* ============ LOG IN function ============ */

export const login = async (user, setError) => {
    try {
        const response = await axios.post('http://localhost:8080/api/login', {
            username: user.usrnm,
            password: user.pwd
        }, { withCredentials: true });

        if (response.data.redirection) {
            console.log('Login successful!');
            window.location.assign(response.data.redirection);
        } else {
            console.log('Login aborted.');
            setError('Login aborted.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        setError('Login failed. Please try again.');
    }
}

/* ============ Edit Profile function ============ */

export const editprofile = async ({ user }, chgpwd, setError) => {
    try {
        const response = await axios.post('http://localhost:8080/api/edit_profile', {
            user: {
                username: user.username,
                email: user.email,
                oldPWD: chgpwd ? user.currPwd : undefined,
                newPWD: chgpwd ? await hashing(user.newPwd) : undefined
            }
        }, { withCredentials: true });

        if (response.data.redirection) {
            console.log("Edit successful!");
            window.location.assign(response.data.redirection);
        } else {
            console.log('Changes did not apply.');
            setError('Changes did not apply.');
        }
    } catch (error) {
        console.error('Update failed. Please try again.')
        setError('Update failed. Please try again.')
    }
}

/* ============ LOG OUT function ============ */

export const logout = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
        if (response.data.redirection) {
            console.log('Log out successful!');
            window.location.assign(response.data.redirection);
        } else {
            console.log('Log out failed.');
        }
    } catch (error) {
        console.error('Error during log out:', error);
    }
}

/* ========== DELETE USER function ========= */

export const deleteUser = async () => {
    try {
        const response = await axios.delete('http://localhost:8080/api/delete_user', { withCredentials: true });
        if (response.data.redirection) {
            window.location.assign(response.data.redirection);
        } else {
            console.log('Delete user failed.');
        }
    } catch (error) {
        console.error('Error during suppression:', error);
    }
}