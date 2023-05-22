import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../Api/api";
import { Company, Quiz, User } from "../Types/types";
import ActionButton from "./Core/ActionButton";
import Button from "./Core/Button";

interface CompanyQuizzesItemProps {
  quiz: Quiz;
  onDeleteQuiz: (actionId: number | undefined) => void;
  checkOwnerOrAdmin: () => boolean | undefined;
  //   onDeclineRequest: (actionId: string) => void;
}

const CompanyQuizzesItem: React.FC<CompanyQuizzesItemProps> = ({
  quiz,
  onDeleteQuiz,
  checkOwnerOrAdmin,
  //   onDeclineRequest,
}) => {
  const { id } = useParams();

  const handleDeleteQuiz = () => {
    onDeleteQuiz(quiz.quiz_id);
  };

  return (
    <div className="flex justify-between p-2 border-2 bg-gray-50 rounded-md">
      <div>
        <div className="text-sm text-gray-500">{quiz.quiz_id}</div>
        <div className="p-2 bg-white">
          <div className="flex items-center mb-4">
            <Link to={`/company-profile/${id}/quizzes-list/${quiz.quiz_id}`}>
              <div>
                <div className="text-xl font-bold text-gray-800">
                  {quiz.quiz_name}
                </div>
                <div className="text-sm font-bold text-gray-500">
                  {quiz.quiz_title}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Add condition in future if needed... */}
        {checkOwnerOrAdmin() && (
          <div className="flex justify-center items-center gap-4">
            <ActionButton label="Delete" onClick={handleDeleteQuiz} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyQuizzesItem;
