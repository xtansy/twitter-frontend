import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Dispatch, SetStateAction, useState } from "react";
import { ILabels } from "../Pages/CustomizeProfile";

export interface CountryType {
    code: string;
    label: string;
}

export const countries: readonly CountryType[] = [
    { code: "RO", label: "Romania" },
    { code: "RS", label: "Serbia" },
    { code: "RU", label: "Russian Federation" },
    { code: "RW", label: "Rwanda" },
];
interface CountrySelectProps {
    setLabels: Dispatch<SetStateAction<ILabels | null>>;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ setLabels }) => {
    const [value, setValue] = useState<CountryType | null>(null);

    const handleChange = (_: any, newValue: CountryType | null) => {
        setValue(newValue);
        setLabels((state) => ({ ...state, country: newValue?.label }));
    };

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
            id="country-select-demo"
            size="small"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => {
                return option.label;
            }}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                >
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                    />
                    {option.label} ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                    }}
                />
            )}
        />
    );
};

export default CountrySelect;
