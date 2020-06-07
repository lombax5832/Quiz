import IQuiz from "./IQuiz";

export default interface ICategory {
    title: string
    slug: string
    _id: string
    description?: string
}

export interface ICategoryWithQuizzes extends ICategory {
    quizzes: Array<IQuiz>
}