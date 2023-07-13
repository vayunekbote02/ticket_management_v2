import React, { createContext } from "react";

const UserRoleContext = createContext();

const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("user");
  contextValue = { userRole, setUserRole };
  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};

export { UserRoleContext, UserProvider };
