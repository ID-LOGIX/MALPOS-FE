import moment from "moment";

export const dateFormatter = (dateString, dateFormat) => {
    return moment(dateString).format(dateFormat);
};