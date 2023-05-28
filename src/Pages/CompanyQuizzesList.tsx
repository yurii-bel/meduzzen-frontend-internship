import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import CompanyQuizzesItem from "../Components/CompanyQuizzesItem";
import ActionButton from "../Components/Core/ActionButton";
import Button from "../Components/Core/Button";
import Spinner from "../Components/Core/Spinner";
import Modal from "../Components/Modal/Modal";
import { RootState } from "../Store";
import { Question, Quiz, Member } from "../Types/types";

const CompanyQuizzesList: React.FC = () => {
  const [quizzesList, setQuizzesList] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");

  const [members, setMembers] = useState<Member[]>([]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      question_text: "",
      question_answers: ["", "", ""],
      question_correct_answer: 0,
    },
    {
      question_text: "",
      question_answers: ["", "", ""],
      question_correct_answer: 0,
    },
  ]);

  const { id } = useParams();

  const user = useSelector((state: RootState) => state.user);

  const getCompany = async () => {
    setMembers(
      await api
        .getCompanyMembersList(Number(id))
        .then((response) => response.data.result.users)
    );
  };

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
    getCompany();
    checkOwnerOrAdmin();
  }, [getCompany, checkOwnerOrAdmin]);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleDeleteQuiz = async (quizId: number | undefined) => {
    try {
      setIsLoading(true);
      await api.deleteQuiz(Number(quizId));
      fetchCompanyQuizzesList();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setQuestions([
      ...questions,
      {
        question_text: "",
        question_answers: [],
        question_correct_answer: 0,
      },
    ]);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].question_correct_answer = answerIndex;
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddAnswer = (
    questionIndex: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].question_answers.push("");
    setQuestions(updatedQuestions);
  };

  const handleQuestionTextChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question_text = text;
    setQuestions(updatedQuestions);
  };

  const handleAnswerTextChange = (
    questionIndex: number,
    answerIndex: number,
    text: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].question_answers[answerIndex] = text;
    setQuestions(updatedQuestions);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "" || frequency.trim() === "") {
      console.log("Please fill in all fields");
      return;
    }

    const hasValidQuestions =
      questions.length >= 2 &&
      questions.every(
        (question) =>
          question.question_text.trim() !== "" &&
          question.question_answers.length >= 2 &&
          question.question_answers.every((answer) => answer.trim() !== "") &&
          question.question_correct_answer !== null
      );

    if (!hasValidQuestions) {
      console.log(
        "Please add at least 2 questions with answers and select a correct answer for each question"
      );
      return;
    }

    api
      .postCreateQuiz({
        quiz_name: name,
        quiz_frequency: Number(frequency),
        company_id: Number(id),
        questions_list: questions,
      })
      .then(() => {
        handleCloseModal();
        fetchCompanyQuizzesList();
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
      });
  };

  const fetchCompanyQuizzesList = () => {
    setIsLoading(true);

    api
      .getCompanyQuizzesList(Number(id))
      .then((response) => {
        setQuizzesList(response.data.result.quizzes);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCompanyQuizzesList();
  }, [fetchCompanyQuizzesList]);

  useEffect(() => {
    checkOwnerOrAdmin();
  }, [members, checkOwnerOrAdmin]);

  return (
    <>
      <Modal
        title="Create Quiz Form"
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        <div>
          <form className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quizname"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="quizname"
                type="text"
                placeholder="Quiz name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quizFrequency"
              >
                Frequency:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="quizFrequency"
                type="number"
                required
                placeholder="Quiz frequency"
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
            <div>
              {questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`quizQuestion-${questionIndex}`}
                  >
                    Question {questionIndex + 1}:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`quizQuestion-${questionIndex}`}
                    type="text"
                    placeholder={`Quiz question ${questionIndex + 1}`}
                    value={question.question_text}
                    required
                    onChange={(e) =>
                      handleQuestionTextChange(questionIndex, e.target.value)
                    }
                  />
                  {question.question_answers.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        name={`correctAnswer-${questionIndex}`}
                        value={answerIndex}
                        required
                        className="border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={() =>
                          handleCorrectAnswerChange(questionIndex, answerIndex)
                        }
                      />
                      <label className="block text-gray-700 text-lg font-bold mb-2">
                        Answer {answerIndex + 1}:
                      </label>
                      <input
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        id={`answer-${questionIndex}-${answerIndex}`}
                        type="text"
                        required
                        name={`answer-${questionIndex}-${answerIndex}`}
                        value={answer}
                        onChange={(e) =>
                          handleAnswerTextChange(
                            questionIndex,
                            answerIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Enter Answer ${answerIndex + 1}`}
                      />
                    </div>
                  ))}
                  <div className="flex mt-4 items-center justify-between">
                    <Button
                      label="Add Answer"
                      onClick={(e) => handleAddAnswer(questionIndex, e)}
                    />
                    <Button
                      label="Remove Question"
                      onClick={(e) => handleRemoveQuestion(questionIndex, e)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Button
                label="Add Question"
                onClick={(e) => handleAddQuestion(e)}
              />
              <Button label="Create" onClick={handleCreate} />
            </div>
          </form>
        </div>
      </Modal>
      <div className="m-6">
        <h3 className="font-bold text-xl mb-4">Quizzes list of the company</h3>
        {checkOwnerOrAdmin() && (
          <ActionButton
            label="Create quiz"
            color="darkblue"
            onClick={handleShowModal}
          />
        )}

        <div className="grid grid-cols-1 mt-4 gap-4 md:grid-cols-2">
          {isLoading ? (
            <Spinner />
          ) : quizzesList.length === 0 ? (
            "No users requests yet "
          ) : (
            quizzesList.map((quiz) => (
              <CompanyQuizzesItem
                key={quiz.quiz_id}
                quiz={quiz}
                onDeleteQuiz={handleDeleteQuiz}
                checkOwnerOrAdmin={checkOwnerOrAdmin}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyQuizzesList;
