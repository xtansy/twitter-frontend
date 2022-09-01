import { useLocation } from "react-router-dom";

import { HomeLayout } from "../layouts";

const CustomizeProfile = () => {
    const userId = useLocation().pathname.split("/").pop();

    return (
        <HomeLayout>
            custom
            <h1>{userId}</h1>
        </HomeLayout>
    );
};

export default CustomizeProfile;
