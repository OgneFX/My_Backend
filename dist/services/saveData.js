let storedData = "";
export const saveDataService = async (data) => {
    storedData = data;
    console.log("Data saved:", data);
};
