export interface IUser {
    id: number;
    name: string;
    surname: string;
    e_mail: string;
    login: string;
    password: string;
    role: number;
}

export interface IUserState {
    user: IUser | null,
    isFetching: boolean,
    loginError: boolean
}

export interface IRole {
    id: number;
    name: string;
}

export interface ICompetition {
    id: number;
    title: string;
    date_of_start: Date;
    date_of_end: Date;
    type: number;
    stage_count: number;
    lng: number;
    lat: number;
    city: string;
    street: string;
    house_num: string;
    building: string;
    office_flat: string;
    summary_addr: string;
    organizer: string;
    organizer_email: string;
    organizer_bank_account: string;
    entry_fee: number;
    age_limit: number;
}

export class Competition implements ICompetition {
    id = 0;
    title = "";
    date_of_start = new Date();
    date_of_end = new Date();
    type = 0;
    stage_count = 1;
    lng = 0;
    lat = 0;
    city = "";
    street = "";
    house_num = "";
    building = "";
    office_flat = "";
    summary_addr = "";
    organizer = "";
    organizer_email = "";
    organizer_bank_account = "";
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
}

export interface IBirthSertificate {
    id: number;
    series: string;
    number: string;
    place_of_issue: string;
    date_of_issue: Date
}

export class BirthSertificate implements IBirthSertificate {
    id = 0;
    series = "";
    number = "";
    place_of_issue = "";
    date_of_issue = new Date();
}

export interface ICircle {
    id: number;
    stage: number;
    circle_num: number;
    circle_name: string;
    sportsman: number;
    time_of_finish: Date;
    points: number;
    place: number;
}

export interface IPassport {
    id: number;
    series: string;
    number: string;
    place_of_issue: string;
    organization_of_issue: string;
    code_of_organization: string;
    date_of_issue: Date;
}

export class Passport implements IPassport {
    id = 0;
    series = "";
    number = "";
    place_of_issue = "";
    organization_of_issue = "";
    code_of_organization = "";
    date_of_issue = new Date();
}

export interface Request_Status {
    id: number;
    name: string;
}

export interface IPaymentParticipant {
    id: number;
    sportsman: number;
    competition: number;
    receipt: number[];
    status: number;
}

export interface IRegisteredSportsman {
    id: number;
    sportsman: number;
    user: number;
}

export interface IResult {
    id: number;
    sportsman: number;
    competition: number;
    points: number;
    place: number;
}

export interface ISportsman {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    birthday: Date;
    pass: number | null;
    birth_sertificate: number | null;
    rank: string;
    team: string;
    SI_chip: string;
}

export class Sportsman implements ISportsman {
    id = 0;
    name = "";
    surname = "";
    patronymic = "";
    birthday = new Date();
    pass = null;
    birth_sertificate = null;
    rank = "";
    team = "";
    SI_chip = "";
}
export interface ISportsmenListItem {
    sportsman: ISportsman,
    pass: IPassport | null,
    birthSertificate: IBirthSertificate | null,
    receipt: string | null
}

export interface IStage {
    id: number;
    result: number;
    stage_num: number;
    stage_name: string;
    distance: number;
    sportsman: number;
    points: number;
    place: number;
}

export interface IStage_Info {
    id: number;
    competition: number;
    stage_number: number;
    circle_count: number;
    comment: string;
}

export class Stage_Info implements IStage_Info {
    id = 0;
    competition = 0;
    stage_number = 0;
    circle_count = 1;
    comment = "";
}

export interface IFilterState {
    isFetching: boolean;
    types: ICompetitionType[];
    search: string;
    selectedType: number | null;
}