import { useContext } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";
import { useMemo } from "react"

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export default function Routes() {
    const { username, id } = useContext(UserContext)
    console.log('routes:', id,username)
    const token = getCookie('token')
    console.log('token in client:', token)

    // if (username) {
    //     return 'logged in!' + username
    // }

    // return (
    //     <RegisterAndLoginForm />
    // )
    
    return useMemo(() => {
        if (username) {
          return 'logged in!' + username;
        }
        return <RegisterAndLoginForm />;
      }, [username]);
}