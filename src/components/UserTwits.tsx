import { Link } from "react-router-dom";
import { Twit } from "../redux/twitsSlice/types";
import TwitBlock from "./TwitBlock";

interface TwitsProps {
    twits: Twit[];
    handleDeleteTwit: (id: string) => void;
}

const UserTwits: React.FC<TwitsProps> = ({ twits, handleDeleteTwit }) => {
    return (
        <>
            {[...twits].reverse().map((item: Twit) => {
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
                            handleDeleteTwit={handleDeleteTwit}
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
        </>
    );
};

export default UserTwits;
