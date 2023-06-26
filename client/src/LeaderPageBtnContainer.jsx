import { useLeaderboardContext } from "./LeaderboardContext/Context";

import ChevronDblLeft from "./assets/ChevronDblLeft";
import ChevronDblRight from "./assets/ChevronDblRight";

const LeaderPageBtnContainer = () => {
  const { numOfRankedPages, rankedPage, changePage } = useLeaderboardContext();

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
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: rankedPage === 1 })
    );
    // Add the dots before the current page if there are more than 3 pages
    if (rankedPage > 2) {
      pageButtons.push(
        <span className="page-dots" key="dots-1">
          ...
        </span>
      );
    }

    // Add the current page button
    if (rankedPage !== 1 && rankedPage !== numOfRankedPages) {
      pageButtons.push(
        addPageButton({ pageNumber: rankedPage, activeClass: true })
      );
    }

    if (rankedPage < numOfRankedPages - 1) {
      pageButtons.push(
        <span className=" page-dots" key="dots+1">
          ...
        </span>
      );
    }

    // Add the last page button
    pageButtons.push(
      addPageButton({
        pageNumber: numOfRankedPages,
        activeClass: rankedPage === numOfRankedPages,
      })
    );

    return pageButtons;
  };

  const prevPage = () => {
    let newPage = rankedPage - 1;
    if (newPage < 1) {
      newPage = rankedPage;
      return;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = rankedPage + 1;
    if (newPage > numOfRankedPages) {
      newPage = numOfRankedPages;
      return;
    }
    changePage(newPage);
  };
  return (
    <div className="page-btns extra-margin">
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
export default LeaderPageBtnContainer;
