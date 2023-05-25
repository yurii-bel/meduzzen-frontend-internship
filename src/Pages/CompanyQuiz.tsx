import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api/api";
import CompanyQuizQuestionAnswerAddItem from "../Components/CompanyQuizQuestionAnswerAddItem";
import CompanyQuizQuestionAnswerItem from "../Components/CompanyQuizQuestionAnswerItem";
import CompanyQuizQuestionItem from "../Components/CompanyQuizQuestionItem";
import ActionButton from "../Components/Core/ActionButton";
import Modal from "../Components/Modal/Modal";
import { RootState } from "../Store";
import { Answers, Member, Question, Quiz } from "../Types/types";

const CompanyQuiz: React.FC = () => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | undefined>(undefined);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});

  const [question, setQuestion] = useState<Question>({
    question_text: "",
    question_answers: ["", ""],
    question_correct_answer: 0,
  });

  const navigate = useNavigate();

  const { id, qid } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [members, setMembers] = useState<Member[]>([]);

  const user = useSelector((state: RootState) => state.user);

  const handleCloseModal = () => {
    setShowModal(false);
    setQuestion({
      question_text: "",
      question_answers: ["", ""],
      question_correct_answer: 0,
    });
  };

  const handleShowEditModal = (question: Question) => {
    setQuestion(question);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setQuestion({
      question_text: "",
      question_answers: ["", ""],
      question_correct_answer: 0,
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCorrectAnswerChange = (answerIndex: number) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      question_correct_answer: answerIndex,
    }));
  };

  const handleAnswerTextChange = (answerIndex: number, value: string) => {
    setQuestion((prevQuestion) => {
      const updatedAnswers = [...prevQuestion.question_answers];
      updatedAnswers[answerIndex] = value;
      return {
        ...prevQuestion,
        question_answers: updatedAnswers,
      };
    });
  };

  const handleQuestionTextChange = (value: string) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      question_text: value,
    }));
  };

  const handleDeleteQuiz = async () => {
    try {
      await api.deleteQuiz(Number(qid));
      navigate(`/company-profile/${id}/quizzes-list/`);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleAddAnswer = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setQuestion((prevQuestion) => {
      const updatedAnswers = [...prevQuestion.question_answers, ""];
      return {
        ...prevQuestion,
        question_answers: updatedAnswers,
      };
    });
  };

  const handleAddQuestion = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      if (currentQuiz) {
        console.log(question);
        await api.postAddQuestion(Number(qid), question);
        setQuestion({
          question_text: "",
          question_answers: ["", ""],
          question_correct_answer: 0,
        });
      }
      handleCloseModal();
      fetchQuiz();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleEditQuestion = async (
    event: React.MouseEvent<HTMLButtonElement>,
    question: Question
  ) => {
    event.preventDefault();
    try {
      if (question.question_id) {
        await api.putUpdateQuestion(question.question_id, {
          question_text: question.question_text,
          question_answers: question.question_answers,
          question_correct_answer: question.question_correct_answer,
        });
      }
      handleCloseEditModal();
      fetchQuiz();
    } catch (error) {
      console.error("Error editing question:", error);
    }
  };

  const handleDeleteQuestion = async (
    event: React.MouseEvent<HTMLButtonElement>,
    questionId: number
  ) => {
    event.preventDefault();
    try {
      await api.deleteQuestion(questionId);
      fetchQuiz();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleFinishQuiz = () => {
    const answers: Answers = {};
    if (currentQuiz?.questions_list) {
      for (let i in currentQuiz.questions_list) {
        const question = currentQuiz.questions_list[i];
        if (question.question_id)
          answers[question.question_id] =
            question.question_answers[selectedAnswers[question.question_id]];
      }
    }
    api
      .postTakeQuiz(Number(qid), { answers })
      .then((response) => {
        const { result_id, result_score } = response.data.result;
        alert(`You have finished the test! Your score is ${result_score}`);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate(`/company-profile/${id}`);
  };

  const fetchQuiz = () => {
    api
      .getQuiz(Number(qid))
      .then((response) => {
        const quiz = response.data.result;
        setCurrentQuiz(quiz);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCompany = async () => {
    setMembers(
      await api
        .getCompanyMembersList(Number(id))
        .then((response) => response.data.result.users)
    );
  };

  useEffect(() => {
    getCompany();
    checkOwnerOrAdmin();
  }, []);

  const checkOwnerOrAdmin = () => {
    for (let member of members) {
      if (
        (user.user_id === member.user_id && member.action === "owner") ||
        member.action === "admin"
      ) {
        return true;
      }
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  return (
    <>
      <Modal
        title="Edit question modal"
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
      >
        <>
          <form>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`quizQuestion`}
            >
              Question
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`quizQuestion`}
              type="text"
              placeholder={`Quiz question`}
              value={question.question_text}
              required
              onChange={(e) => handleQuestionTextChange(e.target.value)}
            />

            {question.question_answers.map((answer, answerIndex) => (
              <CompanyQuizQuestionAnswerItem
                key={answerIndex}
                answerIndex={answerIndex}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                answer={answer}
                handleAnswerTextChange={handleAnswerTextChange}
              />
            ))}
          </form>
          <div className="flex flex-col gap-4 mt-4">
            <ActionButton
              label="Add answer"
              color="darkblue"
              onClick={(event) => handleAddAnswer(event)}
            />
            <ActionButton
              label="Edit question"
              onClick={(e) => handleEditQuestion(e, question)}
            />
          </div>
        </>
      </Modal>

      <Modal
        title="Add question modal"
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        <>
          <form>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`quizQuestion`}
            >
              Question
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`quizQuestion`}
              type="text"
              placeholder={`Quiz question`}
              value={question.question_text}
              required
              onChange={(e) => handleQuestionTextChange(e.target.value)}
            />

            {question.question_answers.map((answer, answerIndex) => (
              <CompanyQuizQuestionAnswerAddItem
                key={answerIndex}
                answer={answer}
                answerIndex={answerIndex}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                handleAnswerTextChange={handleAnswerTextChange}
              />
            ))}
          </form>
          <div className="flex flex-col gap-4 mt-4">
            {" "}
            <ActionButton
              label="Add answer"
              color="darkblue"
              onClick={(event) => handleAddAnswer(event)}
            />
            <ActionButton
              label="Add question"
              color="darkgreen"
              onClick={(event) => handleAddQuestion(event)}
            />
          </div>
        </>
      </Modal>

      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold mb-12">Quiz #{qid}</h3>

        {checkOwnerOrAdmin() && (
          <div className="flex justify-between gap-4 p-2 mb-4 rounded-md bg-gray-700">
            <ActionButton
              label="Add question"
              color="purple"
              onClick={handleShowModal}
            />
            <ActionButton
              label="Delete quiz"
              color="darkred"
              onClick={handleDeleteQuiz}
            />
          </div>
        )}

        {currentQuiz && (
          <div className="flex flex-col px-32 min-w-full ">
            <div className="mt-4  pl-4">
              <div className="font-bold">{currentQuiz.quiz_name}</div>
              <div className="flex gap-1 text-sm text-purple-600 italic">
                <span>Created by:</span>
                <p>{currentQuiz.created_by?.user_firstname}</p>
              </div>
              <div className="flex gap-1 text-sm text-purple-600 italic">
                <span>Description:</span>
                <p>{currentQuiz.quiz_description || "No description yet"}</p>
              </div>
              <div className="flex gap-1 text-sm text-purple-600 italic">
                <span>Frequency:</span>
                <p>{currentQuiz.quiz_frequency}</p>
              </div>
            </div>
            <form
              className="flex flex-col gap-12 mt-4 p-4 rounded-md"
              onSubmit={(e) => e.preventDefault()}
            >
              {currentQuiz.questions_list.map((question, index) => {
                if (question.question_id) {
                  return (
                    <CompanyQuizQuestionItem
                      key={question.question_id}
                      question={{
                        question_id: question.question_id.toString(),
                        question_text: question.question_text,
                        question_answers: question.question_answers,
                      }}
                      index={index}
                      setSelectedAnswers={setSelectedAnswers}
                      handleShowEditModal={handleShowEditModal}
                      handleDeleteQuestion={handleDeleteQuestion}
                      checkOwnerOrAdmin={checkOwnerOrAdmin}
                    />
                  );
                } else {
                  return null; // or handle the case when question_id is undefined
                }
              })}
            </form>
            {/* Render other quiz information */}
            <div className="flex justify-center mt-4 mb-20">
              <ActionButton
                label="Finish Quiz"
                color="darkgreen"
                onClick={() => {
                  handleFinishQuiz();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyQuiz;
