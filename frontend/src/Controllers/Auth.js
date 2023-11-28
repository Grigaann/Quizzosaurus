import axios from 'axios';
import bcrypt from 'bcryptjs';


/* ============ REGISTER function ============ */

export const register = async (user, confirmPassword, setError) => {
    if (user.pwd !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const avlbl = await axios.post('http://localhost:8080/api/checkUser', { username: user.usrnm, email: user.email });
        if (!avlbl.data.available) {
            setError('Username or email is already taken!');
            return;
        } else {
            bcrypt.genSalt(10).then(salt => {
                bcrypt.hash(user.pwd, salt)
                    .then(async (hashed) => {
                        await axios.post('http://localhost:8080/api/signup', {
                            username: user.usrnm,
                            email: user.eml,
                            password: hashed
                        })
                            .then((response) => {
                                if (response.data.success) {
                                    console.log('Registration successful!');
                                    return response.data.redirection;
                                } else {
                                    console.log('Registration failed.');
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
            });
        }
    } catch (error) {
        console.error('Registration failed:', error.message);
        setError('Registration failed. Please try again.');
    }
}

/* ============ LOGIN function ============ */

export const login = async (user, setError) => {
    try {
        const response = await axios.post('http://localhost:8080/api/login', {
            username: user.usrnm,
            password: user.pwd
        }, { withCredentials: true });

        if (response.data.redirection) {
            console.log('Login successful!');
            return response.data.redirection;
        } else {
            console.log('Login failed.');
            setError(response.data.error || 'Login failed. Please try again');
        }
    } catch (error) {
        console.error('Error during login:', error);
        setError('Login failed. Please try again.');
    }
}

/* ============ LOGOUT function ============ */

export const logout = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/logout', {},{ withCredentials: true });
        if (response.data.redirection) {
            console.log('Log out successful!');
            return response.data.redirection;
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
        const response = await axios.delete('http://localhost:8080/api/delete_user',{ withCredentials: true });
        if (response.data.redirection) {
            console.log('User "'+response.data.name+'" successfully deleted!');
            return response.data.redirection;
        } else {
            console.log('Delete user failed.');
        }
    } catch (error) {
        console.error('Error during suppression:', error);
    }
}