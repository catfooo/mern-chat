import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useMemo } from "react"

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
    
    const contextValue = useMemo(() => ({ username, setUsername, id, setId }), [username, setUsername, id, setId]);


    // return (
    //     <UserContext.Provider value={{username, setUsername, id, setId}}>
    //         {children}
    //     </UserContext.Provider>
    // )

    return (
        <UserContext.Provider value={contextValue}>
          {children}
        </UserContext.Provider>
      );
}