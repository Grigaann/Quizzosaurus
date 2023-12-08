import { useState } from "react";

export const usePagination = (perPage, totalPages) => {
  const pageNb = Math.ceil(totalPages / perPage);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(perPage - 1);
  const [currIndex, setCurrIndex] = useState(1);

  const display = (pageNb) => {
    setCurrIndex(pageNb);
    let end_index = perPage * pageNb - 1;
    let start_index = perPage * pageNb - perPage;
    setStartIndex(start_index);

    if (end_index > totalPages) setEndIndex(totalPages - 1);
    else setEndIndex(end_index);
  };

  return [pageNb, startIndex, endIndex, currIndex, display];
};
