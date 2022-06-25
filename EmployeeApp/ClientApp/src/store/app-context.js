import { createContext, useState } from "react";

export const AppContext = createContext({});

function AppContextProvider(props) {
  const [departments, setDepartments] = useState([]);

  const context = {
    departments,
    setDepartments,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
