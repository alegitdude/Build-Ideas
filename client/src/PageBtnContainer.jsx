import ChevronDblLeft from "./assets/ChevronDblLeft";
import ChevronDblRight from "./assets/ChevronDblRight";
import { useAppContext } from "./context/Context";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={` pageBtn ${activeClass && "pageBtn-active"}`}
        key={pageNumber}
        onClick={() => changePage(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };
  const renderPageButtons = () => {
    const pageButtons = [];

    // Add the first page button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));
    // Add the dots before the current page if there are more than 3 pages
    if (page > 2) {
      pageButtons.push(
        <span className="page-dots" key="dots-1">
          ...
        </span>
      );
    }

    // Add the current page button
    if (page !== 1 && page !== numOfPages) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    if (page < numOfPages - 1) {
      pageButtons.push(
        <span className=" page-dots" key="dots+1">
          ...
        </span>
      );
    }

    // Add the last page button
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: page === numOfPages,
      })
    );

    return pageButtons;
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = page;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  return (
    <div className="page-btns">
      <button className="prev-btn" onClick={prevPage}>
        <ChevronDblLeft />
        <span>Prev</span>
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button className="prev-btn" onClick={nextPage}>
        <span>Next</span>
        <ChevronDblRight />
      </button>
    </div>
  );
};
export default PageBtnContainer;
