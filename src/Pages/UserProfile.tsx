import React from "react";
import Rating from "../Components/Core/Rating";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../Api/api";
import Button from "../Components/Core/Button";
import CustomInput from "../Components/Core/CustomInput";
import Modal from "../Components/Modal/Modal";
import { User } from "../Types/types";
import useLogout from "../Utils/handleLogout";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import {
  validateCity,
  validateName,
  validatePhoneNumber,
} from "../Utils/utils";
import ActionButton from "../Components/Core/ActionButton";

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [initialUser, setInitialUser] = useState<User>();
  const [password, setPassword] = useState<string>("");
  const [passwordRe, setPasswordRe] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [passwordDisabled, setPasswordDisabled] = useState<boolean>(true);
  const [updateDisabled, setUpdateDisabled] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<FormData>(new FormData());
  const [userDataCsv, setUserDataCsv] = useState("");

  const handleLogout = useLogout();

  const loggedUser = useSelector((state: RootState) => state.user);
  // Modal
  const [showModal, setShowModal] = useState(false);

  const [userAvgRating, setUserAvgRating] = useState<number>();

  const [quizLastPassTime, setQuizLastPassTime] = useState<string>("");
  const [lastQuizId, setLastQuizId] = useState<number>();

  const roundedRating = Math.round(Number(userAvgRating));
  const validatedRating =
    Number.isInteger(roundedRating) && roundedRating >= 0 ? roundedRating : 0;
  const handleDownloadCSV = () => {
    const csvData =
      "data:text/csv;charset=utf-8," + encodeURIComponent(userDataCsv);
    const link = document.createElement("a");
    link.setAttribute("href", csvData);
    link.setAttribute("download", `user_${id}_quiz_data.csv`);
    link.click();
  };

  const fetchUserQuizData = async () => {
    try {
      const response = await api.getUserLastAnswersCSV(Number(id));
      setUserDataCsv(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserAvgRating = async () => {
    try {
      const response = await api.getUserGlobalRating(Number(id));
      const globalRating = response.data.result.rating;
      setUserAvgRating(globalRating / 10);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserLastQuizPass = async () => {
    try {
      const response = await api.getUserQuizzesLastPass(Number(id));
      const quizzes = response.data.result.quizzes;

      // const tquiz = quizzes.map((quiz: any[]) => console.log(quiz));
      const lastQuiz = quizzes.reduce((latest: any, current: any) => {
        const currentDateTime = new Date(current.last_quiz_pass_at);
        const latestDateTime = latest
          ? new Date(latest.last_quiz_pass_at)
          : null;

        if (!latestDateTime || currentDateTime > latestDateTime) {
          return current;
        }

        return latest;
      }, null);

      setLastQuizId(lastQuiz.quiz_id);
      setQuizLastPassTime(lastQuiz.last_quiz_pass_at);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserAvgRating();
    fetchUserLastQuizPass();
    fetchUserQuizData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  // Validation
  useEffect(() => {
    if (user) {
      if (
        !validateName(user.user_firstname) ||
        !validateName(user.user_lastname) ||
        !validateCity(user.user_city || "") ||
        !validatePhoneNumber(user.user_phone || "")
      ) {
        setUpdateDisabled(true);
      } else {
        setUpdateDisabled(false);
      }
    }
  }, [
    user?.user_firstname,
    user?.user_lastname,
    user?.user_city,
    user?.user_phone,
  ]);

  // Handle events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (user) {
      setUser({ ...user, [name]: value, user_id: user.user_id });
    }
  };

  const handleAvatarFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setAvatarFile(formData);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };
  const handleRePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPasswordRe(value);
  };
  const handleDeleteUser = () => {
    api.deleteUser(Number(id));
    if (user?.user_id === Number(id)) {
      handleLogout();
    }
  };
  const handleCancel = () => {
    setUser(initialUser);
    setDisabled(true);
  };

  const handleEditUser = () => {
    setDisabled(false);
  };

  const handleUpdateUser = () => {
    api.putUpdateInfo(
      Number(id),
      user?.user_firstname ?? "",
      user?.user_lastname ?? "",
      user?.user_status ?? "",
      user?.user_city ?? "",
      user?.user_phone ?? ""
    );
    setDisabled(true);
    setInitialUser(user);
  };

  const handleUpdateUserAvatar = () => {
    api.putUpdateAvatar(Number(id), avatarFile);
    api.getUser(Number(id)).then((response) => {
      const userAvatar = response.data.result.user_avatar;
      if (user) {
        setUser({ ...user, user_avatar: userAvatar });
        api.getUser(Number(id)).then((response) => {
          const user = response;
          setUser(user.data.result);
          setInitialUser(user.data.result);
        });
      }
    });
  };

  const handleUpdatePassword = () => {
    if (password === passwordRe) {
      api.putUpdatePassword(Number(id), password, passwordRe);
      setPassword("");
      setPasswordRe("");
    }
  };

  useEffect(() => {
    if (password === passwordRe && password.length >= 6) {
      setPasswordDisabled(false);
    } else {
      setPasswordDisabled(true);
    }
  }, [password, passwordRe]);

  useEffect(() => {
    const userId = parseInt(id || "");
    if (isNaN(userId)) {
      return;
    }
    api
      .getUser(userId)
      .then((response) => {
        const user = response;
        setUser(user.data.result);
        setInitialUser(user.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start gap-2 mb-32">
      <Modal
        title="Delete profile"
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        <p>Are you sure you want to delete this profile?</p>
        <Button label="Yes" onClick={handleDeleteUser} />
      </Modal>

      <div className="flex flex-col items-center justify-center px-1 py-1 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <img
          className="h-24 w-24"
          src={
            user.user_avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          alt="User Avatar"
        />
        <h2 className="text-xl font-bold text-purple-700">
          {user.user_firstname} {user.user_lastname}
        </h2>
        <div className="mt-2 flex flex-col justify-center items-center bg-purple-50 p-1 border border-gray-500 hover:bg-purple-100 rounded-md">
          <div className="text-sm text-gray-700">
            <span className="font-bold">Rating:</span> {Number(userAvgRating)}/
            {10}
          </div>
          <Rating rating={validatedRating} maxRating={10} />
          <div className="flex flex-col justify-center items-center text-sm text-gray-700">
            <p className="font-bold">Last passed quiz id:</p>
            <span> {lastQuizId}</span>
            <p className="font-bold">Last pass at: </p>
            <span>{quizLastPassTime.replace("T", " ")}</span>
          </div>
        </div>

        <form className="mt-6 space-y-1">
          <div className="grid grid-cols-1 gap-6">
            <CustomInput
              label="First Name"
              type="text"
              name="user_firstname"
              id="firstname"
              onChange={handleChange}
              disabled={disabled}
              value={user.user_firstname}
            />
            {!validateName(user.user_firstname) && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid user firstname.
              </p>
            )}
            {/* Rest of the form inputs */}

            <CustomInput
              label="Last Name"
              type="text"
              name="user_lastname"
              id="lastname"
              onChange={handleChange}
              disabled={disabled}
              value={user.user_lastname}
            />
            {!validateName(user.user_lastname) && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid user lastname.
              </p>
            )}
            <CustomInput
              label="Email Address"
              type="email"
              name="user_email"
              id="email"
              onChange={handleChange}
              disabled={true}
              value={user.user_email}
            />

            <CustomInput
              label="City"
              type="text"
              name="user_city"
              id="city"
              onChange={handleChange}
              disabled={disabled}
              value={`${user.user_city || ""}`}
            />
            {!validateCity(user.user_city || "") && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid city.
              </p>
            )}
            <CustomInput
              label="Is super user?"
              type="text"
              name="isSuperUser"
              id="isSuperUser"
              onChange={handleChange}
              disabled={true}
              value={user.is_superuser ? "Yes" : "No"}
            />
            <CustomInput
              label="Phone"
              type="tel"
              name="user_phone"
              id="phone"
              onChange={handleChange}
              disabled={disabled}
              value={`${user.user_phone || ""}`}
            />
            {!validatePhoneNumber(user.user_phone || "") && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid phone number.
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 px-1 py-1 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        {loggedUser.is_superuser || loggedUser.user_id === user?.user_id ? (
          <>
            <h3 className="text-xl text-center text-purple-900 font-bold mb-12">
              Options
            </h3>
            <Button label="Delete this user" onClick={handleShowModal} />
            {disabled ? (
              <Button
                label="Change user information"
                onClick={handleEditUser}
              />
            ) : (
              <div className="flex justify-center items-center gap-4">
                <Button
                  label="Update user"
                  disabled={updateDisabled}
                  onClick={handleUpdateUser}
                />
                <Button label="Cancel" onClick={handleCancel} />
              </div>
            )}
            <Button
              label="Update password"
              disabled={passwordDisabled}
              onClick={handleUpdatePassword}
            />

            <form className="mt-1 space-y-1">
              <div className="grid grid-cols-1 gap-6">
                <div className="block">
                  <label htmlFor="password" className="text-gray-700 font-bold">
                    New Password
                  </label>
                  <input
                    placeholder="******"
                    type="password"
                    name="password"
                    value={password}
                    id="password"
                    onChange={handlePasswordChange}
                    className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="block">
                  <label
                    htmlFor="passwordRe"
                    className="text-gray-700 font-bold"
                  >
                    Repeat new password
                  </label>
                  <input
                    placeholder="******"
                    type="password"
                    name="passwordRe"
                    value={passwordRe}
                    id="passwordRe"
                    onChange={handleRePasswordChange}
                    className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </form>
            <Button
              label="Update user avatar"
              onClick={handleUpdateUserAvatar}
            />
            <input type="file" accept="image/*" onChange={handleAvatarFile} />
          </>
        ) : (
          <div className="flex flex-col">
            <h3 className="text-xl text-center text-purple-900 font-bold mb-4">
              Options:
            </h3>
            <span className="text-orange-700 font-bold italic!">
              You are not allowed to change this profile!
            </span>
            <span className="text-orange-700 font-bold italic!">
              You must be profile owner or have superuser status!
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center px-1 py-1 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <ul className="flex flex-col justify-center gap-4 text-purple-700">
          <h3 className="text-xl text-center text-purple-900 font-bold mb-4">
            Operations
          </h3>
          <li>
            <Link
              to={`/user-companies-list/${id}`}
              className="hover:text-purple-900"
            >
              User companies
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to={`/user-invites-list/${id}`}
              className="hover:text-purple-900"
            >
              Invites
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to={`/user-requests-list/${id}`}
              className="hover:text-purple-900"
            >
              Requests
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to={`/user-send-request/${id}`}
              className="hover:text-purple-900"
            >
              Send request
            </Link>
          </li>
          <hr />
        </ul>
        <ActionButton
          label="Export quiz results"
          color="darkblue"
          onClick={handleDownloadCSV}
        />
      </div>
    </div>
  );
};

export default UserProfile;
