import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LinkIcon from "@mui/icons-material/Link";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { HomeLayout } from "../layouts";
import { BackButton, TwitBlock } from "../components";
import { axios } from "../core/axios";

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { UserInfo } from "../redux/userSlice/types";
import { Twit } from "../redux/twitsSlice/types";
import { Avatar } from "@mui/material";
import { formatDateForProfile } from "../utils/formatDate";
import { Twits2 } from "../components";

const User = () => {
    const [userData, setUser] = useState<{
        status: string;
        data: UserInfo;
        twits: Twit[];
    } | null>(null);

    const userId = useLocation().pathname.split("/").pop();

    const [value, setValue] = useState(0);

    const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const URL = process.env.REACT_APP_API_URL
                    ? process.env.REACT_APP_API_URL + "users/" + userId
                    : `/users/${userId}`;
                const { data } = await axios.get(URL);
                setUser(data);
            } catch (e) {
                alert("Данный пользователь не найден, иди нах отсюда");
            }
        };
        fetchUser();
    }, [userId]);

    if (!userData) {
        return null;
    }

    const handleDeleteTwit = (id: string) => {
        setUser((state) => {
            if (!state) {
                return state;
            }
            return {
                ...state,
                twits: state?.twits.filter((item) => item._id !== id),
            };
        });
    };
    return (
        <HomeLayout>
            <div className="user">
                <div className="user__header">
                    <BackButton />
                    <div className="user__header-info">
                        <h3 className="fullname">{userData.data.fullname}</h3>
                        <p className="subtitle">
                            {userData.twits.length} твита
                        </p>
                    </div>
                </div>

                <div className="user__imageblock"></div>

                <div className="user__profile">
                    <div className="user__profile-header">
                        <Avatar sx={{ width: 110, height: 110 }} />
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                            to={`/customize/${userId}`}
                        >
                            <button className="button">Изменить профиль</button>
                        </Link>
                    </div>

                    <div className="user__profile-info">
                        <h2 className="fullname">{userData.data.fullname}</h2>
                        <p className="username">@{userData.data.username}</p>
                    </div>

                    <h4 className="user__profile-descr">
                        Frontend Developer / UI Designer / JavaScript
                    </h4>

                    <div className="user__profile-moreinfo">
                        <div className="user__profile-moreinfo__block">
                            <PlaceOutlinedIcon />

                            <p className="subtitle">Moscow, Russia</p>
                        </div>

                        <div className="user__profile-moreinfo__block">
                            <LinkIcon />
                            <p className="subtitle">mysite.com</p>
                        </div>

                        <div className="user__profile-moreinfo__block">
                            <CakeOutlinedIcon />
                            <p className="subtitle">
                                Дата рождения:{" "}
                                {formatDateForProfile(userData.data.birthday)}
                                г.
                            </p>
                        </div>

                        <div className="user__profile-moreinfo__block">
                            <CalendarMonthOutlinedIcon />
                            <p className="subtitle">
                                Регистрация:{" "}
                                {formatDateForProfile(userData.data.createdAt)}
                                г.
                            </p>
                        </div>
                    </div>

                    <div className="user__profile-subs">
                        <p className="subtitle">
                            <span>213</span> в читаемых
                        </p>
                        <p className="subtitle">
                            <span>59</span> читателей
                        </p>
                    </div>
                </div>

                <div className="user__tabs">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Твиты" />
                        <Tab label="Твиты и ответы" />
                        <Tab label="Медиа" />
                        <Tab label="Нравится" />
                    </Tabs>
                </div>
                <Twits2
                    twits={userData.twits}
                    handleDeleteTwit={handleDeleteTwit}
                />
                {/* <>
                    {[...userData.twits].reverse().map((item: Twit) => {
                        return (
                            <Link
                                key={item._id}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/home/tweets/${item._id}`}
                            >
                                <TwitBlock
                                    images={item.images}
                                    createdAt={item.createdAt}
                                    text={item.text}
                                    _id={item._id}
                                    user={{
                                        fullname: item.user.fullname,
                                        username: item.user.username,
                                        avatarUrl: item.user.avatarUrl,
                                        _id: item.user._id,
                                    }}
                                />
                            </Link>
                        );
                    })}
                </> */}
            </div>
        </HomeLayout>
    );
};

export default User;
