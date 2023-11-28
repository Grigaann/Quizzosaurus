import axios from 'axios';

// const login = async (setToken, [username, password], setError) => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/login', {
//             username: username,
//             password: password
//         });

//         if (response.data.token) {
//             console.log('Login successful!\nPath: ',response.data.redirection,'\nToken:', response.data.token);
//             setToken(response.data.token);
//             console.log(response.data.redirection);
//             return response.data.redirection;
//         } else {
//             console.log('Login failed.');
//             setError(response.data.error || 'Login failed. Please try again');
//     }
//     } catch (error) {
//         console.error('Error during login:', error);
//         setError('Login failed. Please try again.');
//     }
// }


const login = async ([username, password], setError) => {
    try {
        const response = await axios.post('http://localhost:8080/api/login', {
            username: username,
            password: password
        }, { withCredentials: true});
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


export default login;