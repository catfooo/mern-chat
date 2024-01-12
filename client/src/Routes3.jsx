import { useContext } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";
// import jwt_decode from "jwt-decode"
import { useState } from "react";
import jwt from 'jsonwebtoken'

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export default function Routes() {
    const { username: contextUsername, id: contextId } = useContext(UserContext);
    const [username, setUsername] = useState(contextUsername);
    const [id, setId] = useState(contextId);

    // const { username, id } = useContext(UserContext)
    console.log('routes:', id,username)
    const token = getCookie('token')
    console.log('token in client:', token)
    if (token) {
        // const decodedToken = jwt_decode(token)
        
        // // Decode the base64-encoded payload manually
        // const payloadBase64 = token.split('.')[1];
        // const decodedPayload = atob(payloadBase64);
        // const decodedToken = JSON.parse(decodedPayload);

        const decodedToken = jwt.verify(token)


        setUsername(decodedToken.username)
        setId(decodedToken.id)
    }

    if (username) {
        return 'logged in!' + username
    }

    return (
        <RegisterAndLoginForm />
    )
}