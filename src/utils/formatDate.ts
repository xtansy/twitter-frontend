import { formatDistance, format } from "date-fns";
import ruLang from "date-fns/locale/ru";

export const formatDate = (date: Date): string => {
    return formatDistance(date, new Date(), {
        locale: ruLang,
    });
};

export const formatDateForProfile = (date: string): string => {
    return format(new Date(date), "d MMMM y", {
        locale: ruLang,
    });
};
