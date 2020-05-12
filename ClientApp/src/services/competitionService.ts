import { ICompetition } from '../@Types/types';

class CompetitionService {
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
                        throw new Error();
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