import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../Api/api";
import { Quiz } from "../Types/types";
import ActionButton from "./Core/ActionButton";

interface CompanyQuizzesItemProps {
  quiz: Quiz;
  onDeleteQuiz: (actionId: number | undefined) => void;
  checkOwnerOrAdmin: () => boolean | undefined;
}

const CompanyQuizzesItem: React.FC<CompanyQuizzesItemProps> = ({
  quiz,
  onDeleteQuiz,
  checkOwnerOrAdmin,
}) => {
  const { id } = useParams();

  const [quizDataCsv, setQuizDataCsv] = useState("");

  const handleDeleteQuiz = () => {
    onDeleteQuiz(quiz.quiz_id);
  };

  const handleDownloadCSV = () => {
    const csvData =
      "data:text/csv;charset=utf-8," + encodeURIComponent(quizDataCsv);
    const link = document.createElement("a");
    link.setAttribute("href", csvData);
    link.setAttribute("download", `company_${id}_quiz${quiz.quiz_id}_data.csv`);
    link.click();
  };

  const fetchUserQuizData = async () => {
    try {
      const response = await api.getCompanyLastAnswersCsvForQuiz(
        Number(id),
        Number(quiz.quiz_id)
      );
      setQuizDataCsv(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserQuizData();
  }, []);

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

        {checkOwnerOrAdmin() && (
          <div className="flex justify-center items-center gap-4">
            <ActionButton label="Delete" onClick={handleDeleteQuiz} />
            <ActionButton
              label="Export"
              color="darkblue"
              onClick={handleDownloadCSV}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyQuizzesItem;
