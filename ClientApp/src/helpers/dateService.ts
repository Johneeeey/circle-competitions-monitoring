class DateService {
    //dd.mm.yyyy
    public GetShortDate(date: Date) {
        if (typeof date.getDate !== "function") {
            date = new Date(date.toString());
        }

        let day: string = date.getDate().toString();;
        let month: string = (date.getMonth() + 1).toString();
        let year = date.getFullYear().toString();

        if (day.length < 2) {
            day = "0" + day;
        }
        if (month.length < 2) {
            month = "0" + month;
        }

        return day + "." + month + "." + year;
    }
    //dd.mm.yy hh:mm
    public GetShortDateTime(date: Date) {
        if (typeof date.getDate !== "function") {
            date = new Date(date.toString());
        }

        let day: string = date.getDate().toString();;
        let month: string = (date.getMonth() + 1).toString();
        let year = date.getFullYear().toString();
        let hour = date.getHours().toString();
        let min = date.getMinutes().toString();

        if (day.length < 2) {
            day = "0" + day;
        }
        if (month.length < 2) {
            month = "0" + month;
        }
        if (hour.length < 2) {
            hour = "0" + hour;
        }
        if (min.length < 2) {
            min = "0" + min;
        }

        return day + "." + month + "." + year.slice(2, 4) + " " + hour + ":" + min;
    }
    //dd/mm/yyyy
    public GetDateForPicker(date: Date) {
        if (typeof date.getDate !== "function") {
            date = new Date(date.toString());
        }

        let day: string = date.getDate().toString();;
        let month: string = (date.getMonth() + 1).toString();
        let year = date.getFullYear().toString();

        if (day.length < 2) {
            day = "0" + day;
        }
        if (month.length < 2) {
            month = "0" + month;
        }

        return day + "/" + month + "/" + year;
    }
}

export default new DateService();