import React from "react";

const CompanyQuizQuestionAnswerItem = ({
  answerIndex,
  handleCorrectAnswerChange,
  answer,
  handleAnswerTextChange,
}: {
  answerIndex: number;
  handleCorrectAnswerChange: (index: number) => void;
  answer: string;
  handleAnswerTextChange: (index: number, value: string) => void;
}) => {
  return (
    <div key={answerIndex} className="flex items-center space-x-2 mt-4">
      <input
        type="radio"
        name={`correctAnswer`}
        value={answerIndex}
        onChange={() => handleCorrectAnswerChange(answerIndex)}
      />
      <label className="block text-gray-700 font-bold mb-2">
        Answer {answerIndex + 1}:
      </label>
      <input
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        id={`answer-${answerIndex}`}
        type="text"
        required
        name={`answer-${answerIndex}`}
        value={answer}
        onChange={(e) => handleAnswerTextChange(answerIndex, e.target.value)}
        placeholder={`Enter Answer ${answerIndex + 1}`}
      />
    </div>
  );
};

export default CompanyQuizQuestionAnswerItem;
