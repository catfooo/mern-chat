import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

export const UserContext = createContext({})

// export function UserContextProvider({children}) {
export const UserContextProvider = ({children}) => {    
    const [username, setUsername] = useState(null)
    const [id, setId] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        axios.get('/profile').then(response => {
            setId(response.data.userId)
            setUsername(response.data.username)
            setIsLoggedIn(true)
            console.log('userContext:', response.data)
        }).catch(error => {
            setIsLoggedIn(false)
            console.error("Error fetching to set isLoggedIn true:", error)
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