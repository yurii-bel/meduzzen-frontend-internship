import React from "react";
import ActionButton from "./Core/ActionButton";

interface QuestionItemProps {
  question: {
    question_id: string;
    question_text: string;
    question_answers: string[];
  };
  index: number;
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
  handleShowEditModal: (question: any) => void;
  handleDeleteQuestion: (
    event: React.MouseEvent<HTMLButtonElement>,
    questionId: number
  ) => void;
  checkOwnerOrAdmin: () => boolean | undefined;
}

const CompanyQuizQuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  setSelectedAnswers,
  handleShowEditModal,
  handleDeleteQuestion,
  checkOwnerOrAdmin,
}) => {
  return (
    <div
      key={question.question_id}
      className="flex justify-between border-2 p-2 rounded-md bg-slate-50"
    >
      <div className="text-gray-700">
        <div className="bg-white p-1 font-semibold border-l-4 border-purple-300">
          <span>{index + 1}. </span>
          {question.question_text}
        </div>
        <div>
          {question.question_answers.map((answer, answerIndex) => {
            return (
              <div
                className="flex pl-2 my-2 items-center space-x-4"
                key={answerIndex}
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name={`option-${question.question_id}`}
                    value={answerIndex}
                    onChange={() => {
                      setSelectedAnswers((prevSelectedAnswers) => ({
                        ...prevSelectedAnswers,
                        [Number(question.question_id)]: answerIndex,
                      }));
                    }}
                  />
                  <span className="text-gray-700">{answer}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {checkOwnerOrAdmin() && (
        <div className="flex gap-4 h-9">
          <ActionButton
            label="Edit"
            color="darkblue"
            onClick={() => handleShowEditModal(question)}
          />
          <ActionButton
            label="Delete"
            color="darkred"
            onClick={(event) =>
              handleDeleteQuestion(event, Number(question.question_id))
            }
          />
        </div>
      )}
    </div>
  );
};

export default CompanyQuizQuestionItem;
