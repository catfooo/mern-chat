import { useContext, useEffect } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";
// import jwt_decode from "jwt-decode"
import { useState } from "react";
import jwt from 'jsonwebtoken'
import { useMemo } from "react"

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export default function Routes() {
    const { username: contextUsername, id: contextId } = useContext(UserContext);
    const [username, setUsername] = useState(contextUsername);
    const [id, setId] = useState(contextId);

    useEffect(() => {
        setUsername(contextUsername);
        setId(contextId);
    }, [contextUsername, contextId]); // Only run when context values change


    // const { username, id } = useContext(UserContext)
    console.log('routes:', id,username)
    const token = getCookie('token')
    console.log('token in client:', token)
    // if (token) {
        // const decodedToken = jwt_decode(token)
        
        // // Decode the base64-encoded payload manually
        // const payloadBase64 = token.split('.')[1];
        // const decodedPayload = atob(payloadBase64);
        // const decodedToken = JSON.parse(decodedPayload);







        // const decodedToken = jwt.verify(token)

        const decodedToken = useMemo(() => {
            if (token) {
              try {
                // return jwt.verify(token);
                const decoded = jwt.verify(token);
                console.log('Decoded Token:', decoded); 
                return decoded;
              } catch (error) {
                // Handle token verification error
                console.error("Error decoding token:", error);
                return null;
              }
            }
            return null;
          }, [token]);
        


        // setUsername(decodedToken.username)
        // setId(decodedToken.id)
    // }

    // useEffect(() => {
    //     if (decodedToken) {
    //       setUsername(decodedToken.username);
    //       setId(decodedToken.id);
    //     }
    //   }, [decodedToken]);
    useEffect(() => {
        if (decodedToken && decodedToken.username && decodedToken.id) {
            setUsername(decodedToken.username);
            setId(decodedToken.id);
        }
    }, [decodedToken]);
    

    if (username) {
        return 'logged in!' + username
    }

    return (
        <RegisterAndLoginForm />
    )
}