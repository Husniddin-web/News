export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, data)
    } catch (error) {
        console.log("saving data");
    }
}
export const getItem = (key) => {
    try {
        return localStorage.getItem(key)
    } catch (error) {
        console.log("getting data");
    }
}
export const removeItem = (key) => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.log("Error");
    }
}