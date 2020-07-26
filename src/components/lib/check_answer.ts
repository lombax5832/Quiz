import { IQuestion } from '../views/quiz/interfaces';

const TAG = 'CHECK_ANSWER';

const checkAnswer = (question: IQuestion): number => {

  const { userAnswers = [], answers } = question;

  console.log(TAG, 'entered checkAnswer with userAnswers=', userAnswers, 'answers=', answers);
  let ret = 0;

  if (answers.filter(a => a.isCorrect).length!==userAnswers.length) {
    console.log(TAG, 'checkAnswer userAnswers count mismatch', userAnswers.length, answers.length)
    return ret;
  }

  const correctMatch: number = answers.reduce( (acc, cur, index) => {

    if(acc === 0) return 0;

    if(cur.isCorrect && -1 === userAnswers.findIndex(ansKey => ansKey === index)){

      console.log(TAG, `choice ${index} isCorrect but not selected in userAnswers`, userAnswers);

      return 0;
    } else if(!cur.isCorrect && -1 < userAnswers.findIndex(ansKey => ansKey === index)){

      console.log(TAG, `choice ${index} NOT correct but selected in userAnswers`, userAnswers);

      return 0;
    }

    else return 1;

  }, 1)

  return correctMatch;
};

export default checkAnswer;
