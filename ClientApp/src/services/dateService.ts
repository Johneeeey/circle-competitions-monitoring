class DateService {
    public GetShortDate(date: Date) {
        if (typeof date.getDate !== "function") {
            date = new Date(date.toString());
        }

        let day: string = date.getDate().toString();;
        let month: string = date.getMonth().toString();
        let year = date.getFullYear();

        if (day.length < 2) {
            day = "0" + day;
        }
        if (month.length < 2) {
            month = "0" + month;
        }

        return day + "." + month + "." + year;
    }
}

export default new DateService();