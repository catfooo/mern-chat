import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

export const UserContext = createContext({})

// export function UserContextProvider({children}) {
export const UserContextProvider = ({children}) => {    
    const [username, setUsername] = useState(null)
    const [id, setId] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // useEffect(() => {
    //     axios.get('/profile').then(response => {
    //         setId(response.data.userId)
    //         setUsername(response.data.username)
    //         setIsLoggedIn(true)
    //         console.log('userContext:', response.data)
    //     }).catch(error => {
    //         setIsLoggedIn(false)
    //         console.error("Error fetching to set isLoggedIn true:", error)
    //     })
    // }, [])    
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token from local storage:', token);
        if (token) {
          // Include the token in the request headers
          axios.get('/profile', {
            headers: {
              Authorization: token,
            },
          })
            .then(response => {
              setId(response.data.userId);
              setUsername(response.data.username);
              setIsLoggedIn(true);
              console.log('userContext:', response.data);
            })
            .catch(error => {
              setIsLoggedIn(false);
              console.error("Error fetching to set isLoggedIn true:", error);
            });
        } else {
          setIsLoggedIn(false);
        }
      }, []);

    return (
        <UserContext.Provider value={{username, setUsername, id, setId, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}

// Add PropTypes for children
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };