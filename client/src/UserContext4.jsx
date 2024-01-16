import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

export const UserContext = createContext({})

// export function UserContextProvider({children}) {
export const UserContextProvider = ({children}) => {    
    const [username, setUsername] = useState(null)
    const [id, setId] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get('/profile').then(response => {
            setId(response.data.userId)
            setUsername(response.data.username)
            setIsLoggedIn(true)
            console.log('userContext:', response.data)
        })
            .catch(error => {
            setIsLoggedIn(false)
            console.error("Error fetching to set isLoggedIn true:", error)
        })
            // .finally(() => {
            //     setIsLoading(false)
            // })
    }, [])

    return (
        // <UserContext.Provider value={{username, setUsername, id, setId }}>
        <UserContext.Provider value={{username, setUsername, id, setId, isLoggedIn }}>
        {/* // <UserContext.Provider value={{username, setUsername, id, setId, isLoggedIn, isLoading }}> */}
            {children}
        </UserContext.Provider>
    )
}

// Add PropTypes for children
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };