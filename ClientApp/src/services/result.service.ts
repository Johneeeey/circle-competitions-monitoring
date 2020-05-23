import { ICircle, IResult, IStage } from "../@Types/types";

class ResultService {
    /**
     * Перерасчет мест в круге
     * @param {ICircle[]} circles - результаты всех спортсменнов на одном круге
     * @return {ICircle[]}
     */
    public RecalculationCirclePlaces(circles: ICircle[]): ICircle[] {
        for (let i = 0; i < circles.length; i++) {
            for (let j = 1; j < circles.length; j++) {
                if (circles[j].points < circles[j - 1].points) {
                    const temp = circles[j];
                    circles[j] = circles[j - 1];
                    circles[j - 1] = temp;
                }
            }
        }
        circles = circles.reverse();
        for (let i = 0; i < circles.length; i++) {
            circles[i].place = i + 1;
        }
        return circles;
    }
    /**
     * Сохранение результата в БД
     * @param {IResult} result - результат, который необходимо сохранить
     * @return {Promes<IResult>}
     */
    public SaveResult(res: IResult): Promise<IResult> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Result/SaveResult`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(res)
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
    /**
     * Сохранение стадии в БД
     * @param {IStage} stage - стадия, которую необходимо сохранить
     * @return {Promise<IStage>} 
     */
    public SaveStage(stage: IStage): Promise<IStage> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Result/SaveStage`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(stage)
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
    /**
     * Сохрание кругов в БД
     * @param {ICircle[]} circles - круги, которые необходимо сохранить
     * @return {Promise<ICircle[]>}
     */
    public SaveCircles(circles: ICircle[]): Promise<ICircle[]> {
        const token = localStorage.getItem("access_token");
        return new Promise((result, error) => {
            fetch(`/Result/SaveCircles`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(circles)
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

export default new ResultService();