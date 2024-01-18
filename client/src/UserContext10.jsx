import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log('Token from local storage:', token);
      if (token) {
        const response = await axios.get("/profile", {
          headers: {
            Authorization: token,
          },
        });
        const userData = response.data;

        // Use setTimeout to delay state updates slightly
        setTimeout(() => {
          setId(userData.userId || id);
          setUsername(userData.username || username);
          setIsLoggedIn(true);
          console.log('userContext values set4:', userData);
        console.log('UserContext values updated4:', { id, username, isLoggedIn });
      
        }, 0);

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

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  useEffect(() => {
    console.log('userContext values set2:', { id, username, isLoggedIn });
    console.log('UserContext values updated2:', { id, username, isLoggedIn });
  }, [id, username, isLoggedIn]);

  useEffect(() => {
    console.log('UserContext values updated:', { id, username, isLoggedIn });
  }, [id, username, isLoggedIn]);

  useEffect(() => {
    console.log('UserContextProvider rendering with useeffect:', { id, username, isLoggedIn });
  }, [id, username, isLoggedIn]);

  console.log('UserContextProvider rendering with:', { id, username, isLoggedIn });

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
