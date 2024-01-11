import { useContext } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";

export default function Routes() {
    const { username, id } = useContext(UserContext)
    console.log('routes:', id,username)

    if (username) {
        return 'logged in!' + username
    }

    return (
        <RegisterAndLoginForm />
    )
}