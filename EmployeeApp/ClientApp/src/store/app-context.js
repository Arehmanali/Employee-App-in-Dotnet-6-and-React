import { createContext, useState } from "react";

export const AppContext = createContext({});

function AppContextProvider(props) {
  const [departments, setDepartments] = useState([]);
  const [addNew, setAddNew] = useState(false);

  const getDepartments = async () => {
    const response = await fetch("departments", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setDepartments(data);
  };

  const context = {
    getDepartments,
    departments,
    setDepartments,
    addNew,
    setAddNew,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
