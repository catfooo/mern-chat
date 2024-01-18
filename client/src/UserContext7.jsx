import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setIdCallback = useCallback((newId) => {
    console.log('Setting new id:', newId);
    setId(newId);
  }, []);

  const setUsernameCallback = useCallback((newUsername) => {
    console.log('Setting new username:', newUsername);
    setUsername(newUsername);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log('Token from local storage:', token);
        if (token) {
          // Include the token in the request headers
          const response = await axios.get("/profile", {
            headers: {
              Authorization: token,
            },
          });
          const userData = response.data;

          setIdCallback(userData.userId);
          setUsernameCallback(userData.username);
          setIsLoggedIn(true);

          console.log('userContext values set:', userData);
          console.log('UserContext values updated:', { id, username, isLoggedIn });
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error fetching to set isLoggedIn true:", error);
      }
    };

    fetchData();
  }, [setIdCallback, setUsernameCallback]);

  useEffect(() => {
    console.log('UserContextProvider rendering with:', { id, username, isLoggedIn });
  }, [id, username, isLoggedIn]);

  return (
    <UserContext.Provider value={{ username, setUsername: setUsernameCallback, id, setId: setIdCallback, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
