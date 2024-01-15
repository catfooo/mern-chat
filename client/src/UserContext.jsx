import { createContext, useEffect, useState } from "react"
import axios from "axios"
// import Cookies from 'js-cookie'
// import jwt from 'jsonwebtoken'

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [username, setUsername] = useState(null)
    const [id, setId] = useState(null)
    useEffect(() => {
        axios.get('/profile').then(response => {
            setId(response.data.userId)
            setUsername(response.data.username)
            console.log('userContext:', response.data)
        })
    }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('/profile')
    //             setId(response.data.userId)
    //             setUsername(response.data.username)
    //         } catch (error) {
    //             console.error("Error fetching user profile:", error)
    //         }
    //     }
    //     fetchData()
    // }, []) // empty dependency array to run the effedt only once

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('/profile')
    //             console.log('Profile response:', response.data)
    //             setId(response.data.userId)
    //             setUsername(response.data.username)
    //         } catch (error) {
    //             console.error("Error fetching user profile:", error)
    //         }
    //     }
    //     fetchData()
    // }, []) // empty dependency array to run the effedt only once
    // // }, [id, username]) // to trigger re-render // this makes user cant go to profile even 200 network tab
    
    // Define jwtSecret here (replace 'your-secret' with your actual secret)
    // const jwtSecret = 'your-secret';

    // // Inside UserContextProvider useEffect
    // useEffect(() => {
    //     // Check if there's a token cookie
    //     const token = getCookie('token');
    
    //     if (token) {
    //         // Decode the token and update context values
    //         jwt.verify(token, jwtSecret, {}, (err, userData) => {
    //         // jwt.verify(token, process.env.REACT_APP_JWT_SECRET, {}, (err, userData) => {
    //             if (err) {
    //                 console.error('Error decoding token:', err);
    //             } else {
    //                 setId(userData.userId);
    //                 setUsername(userData.username);
    //             }
    //         });
    //     } else {
    //         // If no token, fetch user profile from the server
    //         axios.get('/profile').then(response => {
    //             setId(response.data.userId);
    //             setUsername(response.data.username);
    //         });
    //     }
    // }, []);

    // Define getCookie function
    // const getCookie = (name) => Cookies.get(name);

    return (
        <UserContext.Provider value={{username, setUsername, id, setId}}>
            {children}
        </UserContext.Provider>
    )
}

// UserContextProvider.propTypes = {
//     children: PropTypes.node.isRequired,
//   };