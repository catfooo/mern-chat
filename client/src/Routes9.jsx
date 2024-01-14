import { useContext, useEffect, useState } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";

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

        const token = getCookie('token');
        console.log('token in client:', token);
        console.log('routes:', id, username);
    }, [contextUsername, contextId, id, username]); // Only run when context values change

    // const token = getCookie('token');
    // console.log('token in client:', token);
    // console.log('routes:', id, username);

    if (username) {
        return 'logged in!' + username;
    }

    return <RegisterAndLoginForm />;
}
