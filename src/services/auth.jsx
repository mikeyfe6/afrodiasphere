export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("AdsUser") !== "undefined"
        ? JSON.parse(window.localStorage.getItem("AdsUser"))
        : {};

export const setUser = (user) =>
    window.localStorage.setItem("AdsUser", JSON.stringify(user));

export const isLoggedIn = () => {
    const user = getUser();
    if (user) {
        return !!user.jwt;
    } else {
        return false;
    }
};

export const logout = (callback) => {
    setUser({});
    callback();
};
