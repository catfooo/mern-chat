import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

export const UserContext = createContext({})

// export function UserContextProvider({children}) {
export const UserContextProvider = ({children}) => {    
    const [username, setUsername] = useState(null)
    const [id, setId] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // const setId2 = (newId) => {
    //   console.log('Setting new id:', newId);
    //   setId(newId);
    // };
    
    // const setUsername2 = (newUsername) => {
    //   console.log('Setting new username:', newUsername);
    //   setUsername(newUsername);
    // };
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
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     console.log('Token from local storage:', token);
    //     if (token) {
    //       // Include the token in the request headers
    //       axios.get('/profile', {
    //         headers: {
    //           Authorization: token,
    //         },
    //       })
    //         .then(response => {
    //           setId(response.data.userId);
    //           setUsername(response.data.username);
    //           setIsLoggedIn(true);
    //           console.log('userContext values set:', response.data);
    //           // Log values after they are set
    //         console.log('right after set: UserContext values updated:', { id, username, isLoggedIn });
       
    //         })
    //         .catch(error => {
    //           setIsLoggedIn(false);
    //           console.error("Error fetching to set isLoggedIn true:", error);
    //         });
    //     } else {
    //       setIsLoggedIn(false);
    //     }
    //   }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log('Token from local storage:', token);
          if (token) {
            // Include the token in the request headers
            const response = await axios.get("/profile", {
              headers: {
                Authorization: token,
              },
            });
            const userData = response.data;
            // setId(userData.userId);
            // setUsername(userData.username);
            // Use callback form of state setter functions
        setId(prevId => userData.userId || prevId);
        setUsername(prevUsername => userData.username || prevUsername);
       
            setIsLoggedIn(true);
            console.log('userContext values set:', userData);
            console.log('right after set: UserContext values updated:', { id, username, isLoggedIn });
            // setId2(userData.userId);
            // setUsername2(userData.username);
            // console.log('right after set3: UserContext values updated:', { id, username, isLoggedIn });
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          setIsLoggedIn(false);
          console.error("Error fetching to set isLoggedIn true:", error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      console.log('userContext values set2:', { id, username, isLoggedIn });
      // Log values after they are set
      console.log('right after set: UserContext values updated2:', { id, username, isLoggedIn });
    }, [id, username, isLoggedIn]);
  

      useEffect(() => {
        console.log('UserContext values updated:', { id, username, isLoggedIn });
      }, [id, username, isLoggedIn]);

      useEffect(() => {
        console.log('UserContextProvider rendering with useeffect:', { id, username, isLoggedIn });
    }, [id, username, isLoggedIn]);
    

      // More console logs to check the flow of data
  console.log('UserContextProvider rendering with:', { id, username, isLoggedIn });


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