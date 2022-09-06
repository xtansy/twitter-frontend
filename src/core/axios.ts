import axios from "axios";

const useToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
        axios.defaults.headers.common["token"] = token;
    }
};
// eslint-disable-next-line react-hooks/rules-of-hooks
useToken();
export { axios, useToken };
