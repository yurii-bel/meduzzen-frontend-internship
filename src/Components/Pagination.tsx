interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  const maxPages = 11;

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

  return <>{pageNumbers}</>;
};

export default Pagination;
