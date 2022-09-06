import TextField from "@mui/material/TextField";

import { useLocation } from "react-router-dom";
import { useState } from "react";

import { useAppDispatch } from "../redux/store";
import { customUser } from "../redux/userSlice/userSlice";
import { HomeLayout } from "../layouts";
import { CountrySelect, BackButton } from "../components";

export interface ILabels {
    country?: string | undefined;
    about?: string;
}

const MAX_VALUE = 40;
enum CustomError {
    MANY_SYMBOLS = `Количество символов от 1 до 30`,
}

const labelsCheck = (labels: ILabels): ILabels | null => {
    const result: ILabels = {};
    let key: keyof ILabels;
    for (key in labels) {
        if (labels[key]) {
            result[key] = labels[key];
        }
    }
    if (Object.keys(result).length === 0) {
        return null;
    }
    return result;
};

const CustomizeProfile = () => {
    const dispatch = useAppDispatch();
    const userId = useLocation().pathname.split("/").pop();

    const [error, setError] = useState<CustomError | undefined>(undefined);

    const [labels, setLabels] = useState<ILabels | null>(null);

    const handleClick = () => {
        if (!labels) {
            return;
        }

        const result = labelsCheck(labels);

        if (result) {
            dispatch(customUser(result));
        }
    };

    const handleChangeAbout = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length > MAX_VALUE) {
            setError(CustomError.MANY_SYMBOLS);
            return;
        }
        setError(undefined);
        setLabels((state) => ({ ...state, about: value }));
    };

    return (
        <HomeLayout>
            <div className="custom">
                <div className="custom__header">
                    <BackButton />
                    <h1 className="custom__title">Изменить профиль</h1>
                </div>
                <div className="custom__content">
                    <CountrySelect setLabels={setLabels} />
                    <TextField
                        size="small"
                        id="outlined-basic"
                        label="О себе"
                        variant="outlined"
                        value={labels?.about ? labels?.about : ""}
                        onChange={handleChangeAbout}
                        sx={{ width: 300 }}
                        error={!!error}
                        helperText={error}
                    />
                </div>
                <div className="custom__footer">
                    <button
                        onClick={handleClick}
                        className="button custom__button"
                    >
                        Изменить
                    </button>
                </div>
            </div>
        </HomeLayout>
    );
};

export default CustomizeProfile;
