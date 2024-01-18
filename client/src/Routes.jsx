import { useContext, useEffect, useState } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";

// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// };

export default function Routes() {
    // const { username: contextUsername, id: contextId } = useContext(UserContext);
    const { isLoggedIn, username: contextUsername, id: contextId } = useContext(UserContext);
    const [username, setUsername] = useState(contextUsername);
    const [id, setId] = useState(contextId);
    console.log('2', username, id)

    useEffect(() => {
        console.log('Inside useEffect - contextUsername:', contextUsername);
    console.log('Inside useEffect - contextId:', contextId);

        setUsername(contextUsername);
        setId(contextId);

        // const token = getCookie('token');
        const token = localStorage.getItem('token'); // Use local storage instead of cookies
        console.log('token in client:', token);
        console.log('routes:', id, username);
    }, [contextUsername, contextId, id, username]); // Only run when context values change
// }, [contextUsername, contextId, token]); // Only run when context values change
// }, [contextUsername, contextId]); // Only run when context values change

       // Log initial values after the initial render
       useEffect(() => {
        console.log('Initial values:', id, username);
    }, []);

    console.log('routes2:', id, username);

    if (username) {
    // if (isLoggedIn) {
        return 'logged in!' + username;
    }

    return <RegisterAndLoginForm />;
}
