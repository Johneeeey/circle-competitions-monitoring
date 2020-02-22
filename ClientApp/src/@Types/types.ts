export interface IUser {
    id: number;
    name: string;
    surname: string;
    e_mail: string;
    login: string;
    password: string;
    role: number;
}

export interface IRole {
    id: number;
    name: string;
}

export interface ICompetition {
    id: number;
    date_of_start: Date;
    date_of_end: Date;
    type: number;
    lng: number;
    lat: number;
    city: string;
    street: string;
    house_num: string;
    building: string;
    office_flat: string;
    summary_addr: string;
    organizer: string;
    entry_fee: number;
    age_limit: number;
}

export class Competition implements ICompetition {
    id = 0;
    date_of_start = new Date();
    date_of_end = new Date();
    type = 0;
    lng = 0;
    lat = 0;
    city = "";
    street = "";
    house_num = "";
    building = "";
    office_flat = "";
    summary_addr = "";
    organizer = "";
    entry_fee = 0;
    age_limit = 0;
}

export interface ICompetitionType {
    id: number;
    name: string;
}

export interface ICompetitionsState {
    isFetching: boolean;
    competitions: ICompetition[];
    competition: ICompetition
}