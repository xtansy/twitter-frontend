import IconButton from "@mui/material/IconButton";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axios } from "../core/axios";

import { UserInfo } from "../redux/userSlice/types";
import { Avatar } from "@mui/material";

const UserList = () => {
    const [users, setUsers] = useState<UserInfo[] | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const URL = process.env.REACT_APP_API_URL
                    ? process.env.REACT_APP_API_URL + "users"
                    : "/users";
                const { data } = await axios.get(URL);
                setUsers(data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchUsers();
    }, []);

    if (!users) {
        return null;
    }

    return (
        <div className="home__search-read">
            <h2 className="home__search-read__title">Кого читать</h2>

            {users.map((item) => {
                return (
                    <Link
                        key={item._id}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                        to={`/user/${item._id}`}
                    >
                        <div className="home__search-read__profile">
                            <Avatar />
                            <div className="home__search-read__profile-info">
                                <h3 className="fullname">{item.fullname}</h3>
                                <p className="username">@{item.username}</p>
                            </div>
                            <IconButton color="primary">
                                <PersonAddOutlinedIcon />
                            </IconButton>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default UserList;
