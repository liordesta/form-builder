import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [formFields, setFormFields] = useState([]);
  const [allForms, setAllForms] = useState([]);
  const [singleForm, setSingleForm] = useState([]);
  const state = {
    formFields,
    setFormFields,
    allForms,
    setAllForms,
    singleForm,
    setSingleForm,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
