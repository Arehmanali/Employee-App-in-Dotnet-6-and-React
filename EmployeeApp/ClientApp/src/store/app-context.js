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

  const getDepartmentId = (depName) => {
    const tempDep = departments.filter((e) => e.departmentName === depName);
    return tempDep[0].departmentId;
  };

  const getDepartmentName = (depId) => {
    const tempDep = departments.filter((e) => e.departmentId === depId);
    return tempDep[0].departmentName;
  };

  const getImageId = (imageName) => {
    return departments.find((e) => e.departmentName === imageName);
  };

  const context = {
    getDepartments,
    departments,
    setDepartments,
    addNew,
    setAddNew,
    getDepartmentId,
    getDepartmentName,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
