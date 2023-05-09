import User from "../Components/User";
import api from "../Api/api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../Store/usersListReducer";
import { RootState } from "../Store";
import Button from "../Components/Core/Button";

const UsersList: React.FC = () => {
  const dispath = useDispatch();
  const users = useSelector((state: RootState) => state.userList);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    api.getUsers(currentPage).then((response) => {
      const { pagination } = response.data.result;
      const userList = response.data.result.users;
      dispath(setUsers(userList));
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.total_page);
      setTotalResults(pagination.total_results);
    });
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 11; // Maximum number of page numbers to display

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPages) {
      if (currentPage <= maxPages - 5) {
        endPage = maxPages - 1;
      } else if (currentPage >= totalPages - 5) {
        startPage = totalPages - maxPages + 5;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 5;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-2 py-1 rounded ${
            i === currentPage
              ? "bg-purple-800 text-white"
              : "bg-white text-purple-800"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <section className="flex flex-col mt-4 mb-24">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 px-12 mb-4">
        {users.map((user, id) => (
          <User user={user} key={id} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-12 mx-12">
        <div className="flex gap-1">
          <Button
            label="First"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          />
          <Button
            label="Previous"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
        </div>
        <div>{renderPageNumbers()}</div>
        <div className="flex gap-1">
          <Button
            label="Next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
          <Button
            label="Last"
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          />
        </div>
        <div>
          <p>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </p>
          <p>
            Total results: <strong>{totalResults}</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default UsersList;
