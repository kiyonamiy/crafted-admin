import { createContext, useContext, useState } from "react";
import { IProperty, IPosition } from "./interface";

interface ConfigurationContextProps {
  elements: IProperty[];
  addElementAt: (position: IPosition) => void;
  removeElement: (id: string) => void;
}

const ConfigContext = createContext({} as ConfigurationContextProps);

export const ConfigurationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elements, setElements] = useState<IProperty[]>([]);

  const generateId = () => {
    // test
    return (elements.length + 1).toString();
  };

  const addElementAt = (position: IPosition) => {
    const newElement: IProperty = {
      id: generateId(),
      position,
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  return (
    <ConfigContext.Provider value={{ elements, addElementAt, removeElement }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigurationProvider = () => {
  return useContext(ConfigContext);
};
