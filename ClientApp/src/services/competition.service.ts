import { ICompetition, IStage_Info, IPaymentParticipant, IRequest_Status } from '../@Types/types';

class CompetitionService {
    /**
     * Вытягиевание статусов запросов на участие
     * @returns {Promise<IRequest_Status[]>}
     */
    public GetStatuses(): Promise<IRequest_Status[]> {
        return new Promise((result, error) => {
            fetch(`/Competition/GetStatuses`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Не удалось получить список статусов запросов");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Вытягивание данных о заявках на участие в соревновании
     * @param idCompetition - иденификационный номер соревнования
     * @returns {Promise<IPaymentParticipant[]>}
     */
    public GetParticipantsByCompetition(idCompetition: number): Promise<IPaymentParticipant[]> {
        return new Promise((result, error) => {
            fetch(`/Competition/GetParticipantsByCompetition?id=${idCompetition}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Не удалось получить список запросов");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Вытягвание данных о заявках на участие в соревнованиях по пользователю
     * @param idUser - идентификационный номер пользователя
     * @returns {Promise<IPaymentParticipant[]>}
     */
    public GetParticipantsByUser(idUser: number): Promise<IPaymentParticipant[]> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Competition/GetParticipantsByUser?id=${idUser}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Не удалось получить список запросов");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Сохранение задания
     * @param {ICompetition} competition - соревнования
     * @returns {Promise<ICompetition>}
     */
    public SaveCompetition(competition: ICompetition): Promise<ICompetition> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Competition/SaveCompetition`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(competition)
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при сохранении задания");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Получение стадий соревнования
     * @param {number} id - Идентификационный номер соревнования
     * @return {Promise<IStage_Info[]}
     */
    public GetCompetitionStagesInfo(id: number): Promise<IStage_Info[]> {
        return new Promise((result, error) => {
            fetch(`/Competition/GetCompetitionStagesInfo?id=${id}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Не удалось получить список стадий соревнования");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Сохранение информации о стадиях соревнования
     * @param {IStage_Info[]} stages_info - информация о стадиях
     * @return {Promise<IStage_Info[]>}
     */
    public SaveStagesInfo(stages_info: IStage_Info[]): Promise<IStage_Info[]> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Competition/SaveStagesInfo`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(stages_info)
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при сохранении информации о стадиях");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
}

export default new CompetitionService();