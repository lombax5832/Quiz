export  interface IQuiz{
    title: string
    slug: string
    _id: string
    description?: string
    quiz_id?: string
}

export interface IQuizWithCategory extends IQuiz {
    categoryName: string
}
