import { IQuestion } from '../views/quiz/interfaces';

const checkAnswer = (question: IQuestion): number => {

  const { userAnswers = [], answers } = question;

  console.log('entered checkAnswer with userAnswers=', userAnswers, 'answers=', answers);
  let ret = 0;

  if (answers.filter(a => a.isCorrect).length!==userAnswers.length) {
    console.log('checkAnswer userAnswers count mismatch', userAnswers.length, answers.length)
    return ret;
  }

  answers.forEach((answer, index) => {

        if (answer.isCorrect && userAnswers.findIndex(ansKey => ansKey===index) < 0) {
          console.log('checkAnswer no user answer for index', index, 'answers:', answer, 'userAnswers:', userAnswers)
          return 0;
        }
      },
  );

  return 1;
};

export default checkAnswer;
