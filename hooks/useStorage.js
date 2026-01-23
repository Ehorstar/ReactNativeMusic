import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const useStorage = (key, data, dispatch, type) => {

    
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(key);
        if (saved) {
          dispatch({
            type: type,
            payload: JSON.parse(saved),
          });
        }
      } catch (error) {
        console.log("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.log("Error saving data:", error);
      }
    };
    saveData();
  }, [key, data]);
};

export default useStorage;
