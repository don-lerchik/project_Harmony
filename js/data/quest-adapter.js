import {DefaultAdapter} from "../model";

const preprocessAnswer = (answers) => {
  const answersArray = [];
  answers.forEach((it) => {
    answersArray.push({
      image: it.image,
      type: it.type
    });
  });
  return answersArray;
};

export default new class extends DefaultAdapter {
  preprocess(data) {
    const preprocessed = {};
    Object.keys(data).forEach((it, i) => {
      preprocessed[`${i + 1}`] = {
        type: data[it].type,
        question: data[it].question,
        answers: preprocessAnswer(data[it].answers)
      };
    });
    return preprocessed;
  }
}();
