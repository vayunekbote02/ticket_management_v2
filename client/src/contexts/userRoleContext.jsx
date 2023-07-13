import React, { createContext } from "react";

const UserRoleContext = createContext();

const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("user");
  const contextValue = { userRole, setUserRole };
  return (
    <UserRoleContext.Provider value={contextValue}>
      {children}
    </UserRoleContext.Provider>
  );
};

export { UserRoleContext, UserProvider };
