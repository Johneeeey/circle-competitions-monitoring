import { IBirthSertificate, IPassport, ISportsman, IPaymentParticipant } from "../@Types/types";

class SportsmanService {
    /**
     * Конвертирование картинки в массив Blob
     * @param {string | null} ethalone - путь к картинке
     * @return {Promise<Blob>}
     */
    public getBlobFromImage(ethalone: string): Promise<Blob> {
        return new Promise((result, error) => {
            fetch(`${ethalone}`)
                .then(res => res.blob())
                .then((response: Blob) => result(response))
                .catch(err => error(err));
        });
    }
    /**
     * добавление чека к записи о регистрации спортсмена
     * @param {FormData} receipt - чек
     * @param {number} id - идентификационный номер записи о регистрации участника
     * @return {Promise<IPaymentParticipant>}
     */
    public AddReceptToParticipant(receipt: FormData, id: number): Promise<IPaymentParticipant> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/AddReceiptToParticipant?participant_id=${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: receipt
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при сохранении чека");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Удаление заявки на участе в соревновании
     * @param {IPaymentParticipant} participant - заявка на участие, которую необходимо удалить
     * @param {number} userId - идентификационный номер пользователя, выполняющего действие
     * @returns {Promise<IPaymentParticipant[]>} 
     */
    public RemovePaymentParticipant(participant: IPaymentParticipant, userId: number): Promise<IPaymentParticipant[]> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/RemovePaymentParticipant?userId=${userId}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(participant)
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Произошла ошибка при удалении запроса");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Сохранение записи о регистрации спортсмена
     * @param {IPaymentParticipant} participant - запись о регистрации спортсмена
     * @return {Promise<IPaymentParticipant>}
     */
    public SaveParticipant(participant: IPaymentParticipant): Promise<IPaymentParticipant> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/AddPaymentParticipant`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(participant)
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при сохранении запроса на участие");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Обновление статусов записи о регистрации на соревнование
     * @param {IPaymentParticipant[]} payments - список заявок
     * @returns {Promise<IPaymentParticipant[]>}
     */
    public UpdatePaymentParticipantStatus(payments: IPaymentParticipant[]): Promise<IPaymentParticipant[]> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/UpdatePaymentParticipantStatus`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payments)
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при обновлении статусов запросов на участие");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Сохранение спортсмена
     * @param {ISportsman} sportsman - спортсмен
     * @return {Promise<ISportsman>}
     */
    public SaveSportsman(sportsman: ISportsman): Promise<ISportsman> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/AddSportsman`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(sportsman)
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при сохранении спортсмена");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Сохранение паспорта
     * @param {IPassport} passport - паспорт
     * @return {Promise<IPassport>}
     */
    public SavePassport(passport: IPassport): Promise<IPassport> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/AddPassport`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(passport)
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошбика при сохранении паспорта");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Сохранение свидетельства о рождении
     * @param {IBirthSertificate} birth_sertificate - свидетельство о рождении
     * @return {Promise<IBirthSertificate>}
     */
    public SaveBirthSertificate(birth_sertificate: IBirthSertificate): Promise<IBirthSertificate> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/AddBirthSertificate`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(birth_sertificate)
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при сохарении свидетельства о рождении");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Вытягивание паспорта
     * @param {number} passId - идентификационный номер паспорта
     * @returns {Promise<IPassport>}
     */
    public GetPassport(passId: number): Promise<IPassport> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/GetPassport?passId=${passId}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при получении паспортных данных");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
    /**
     * Вытягивание свидетельства о рождении
     * @param {number} sertId - идентификационный номер свидетельства о рождении
     * @returns {Promise<IBirthSertificate>}
     */
    public GetBirthSertificate(sertId: number): Promise<IBirthSertificate> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Sportsman/GetBirthSertificate?sertId=${sertId}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw Error("Ошибка при получении данных свидетельства о рождении");
                    } else {
                        return response.json();
                    }
                })
                .then(data => result(data))
                .catch(err => error(err))
        })
    }
}

export default new SportsmanService();