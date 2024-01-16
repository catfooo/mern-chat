import { useContext, useEffect, useState } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export default function Routes() {
    // const { username: contextUsername, id: contextId } = useContext(UserContext);
    const { isLoggedIn, username: contextUsername, id: contextId } = useContext(UserContext);
    const [username, setUsername] = useState(contextUsername);
    const [id, setId] = useState(contextId);
    const [isLoading, setIsLoading] = useState(true)
    console.log('2', username, id)
    console.log('3', username, id, isLoggedIn)
    console.log('isLoading:', isLoading);
    console.log('isLoggedIn:', isLoggedIn);

    useEffect(() => {
        setUsername(contextUsername);
        setId(contextId);
        // setIsLoading(false)

        const token = getCookie('token');
        console.log('token in client:', token);
        console.log('routes:', id, username);
        setIsLoading(false)
    }, [contextUsername, contextId, id, username]); // Only run when context values change

    if (isLoading) {
        return 'loading...'
    }

    // if (username) {
    // // if (isLoggedIn) {
    //     console.log('contextUsername:', contextUsername)
    //     return 'logged in!' + username;
    // }

    // if (username) {
        if (isLoggedIn) {
            console.log('contextUsername2:', contextUsername)
            return 'logged in2!' + username;
        }

    return <RegisterAndLoginForm />;
}
