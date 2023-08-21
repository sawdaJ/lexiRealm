import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [child, setChild] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', {
          withCredentials: true,
        });
        setUser(response.data.user);
        setChild(response.data.child); // Assuming the child information is available in the "child" property
      } catch (error) {
        console.log(error);
      }
    };

    if (!user || !child) {
      fetchUserProfile();
    }
  }, [user, child]);

  return (
    <UserContext.Provider value={{ user, setUser, child, setChild }}>
      {children}
    </UserContext.Provider>
  );
}
