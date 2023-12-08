import React from "react";

export default function Pagination({ currIndex, setCurrIndex, totalPages, setCurrentPage, allQuestions, perPage }) {
    const handlePrev = () => {
        setCurrIndex(currIndex - 1);
        setCurrentPage(allQuestions.slice((currIndex - 2) * perPage, (currIndex - 1) * perPage));
    };

    const handleNext = () => {
        setCurrIndex(currIndex + 1);
        setCurrentPage(allQuestions.slice(currIndex * perPage, (currIndex + 1) * perPage));
    };

    return (
        <div id='change-page'>
            <button onClick={handlePrev} disabled={currIndex === 1}>Previous</button>
            <button onClick={handleNext} disabled={currIndex === totalPages}>Next</button>
        </div>
    );
}