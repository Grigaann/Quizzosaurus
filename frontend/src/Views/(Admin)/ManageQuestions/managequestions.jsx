import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from '../../Components/SearchBar/searchbar';
import { useFetch } from '../../../Controllers/useFetch';
import { usePagination } from '../../../Controllers/usePagination';

import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import QuestionList from './Components/QuestionList/questionlist';
import Pagination from './Components/Pagination/pagination';
import { AddQuestionForm } from './Components/QuestionForm/AddQuestionForm/addquestionform';
import { EditQuestionForm } from './Components/QuestionForm/EditQuestionForm/editquestionform';

import './managequestions.css';
import axios from 'axios';

export default function ManageQuestions() {
    const { data: allQuestions, error } = useFetch(`${process.env.REACT_APP_API_URL}/api/fetchQuestions`);
    const [totalPages, startIndex, endIndex, currIndex, setCurrIndex] = usePagination(10, allQuestions ? allQuestions.length : 0);
    const [currentPage, setCurrentPage] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [extendedIds, setExtendedIds] = useState([]);
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    const [isEditQuestionOpen, setIsEditQuestionOpen] = useState({ state: false, qestionID: null });

    useEffect(() => {
        if (allQuestions) {
            setCurrentPage(allQuestions.slice(startIndex, endIndex + 1));
        }
    }, [allQuestions, startIndex, endIndex]);


    const filteredQuestions = useMemo(() => {
        if (!currentPage) {
            return [];
        }

        return currentPage.filter(question =>
            question.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [currentPage, searchTerm]);


    const handleSearch = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    const openAddQuestionForm = () => {
        setIsAddQuestionOpen(true);
    };
    const closeAddQuestionForm = () => {
        setIsAddQuestionOpen(false);
        window.location.reload();
    };

    const openEditQuestionForm = (id) => {
        setIsEditQuestionOpen({ state: true, questionID: id });
    };
    const closeEditQuestionForm = () => {
        setIsEditQuestionOpen({ state: false, questionID: null });
        window.location.reload();
    };

    const handleDelete = (questionId) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/deleteQuestion/${questionId}`);
        window.location.reload();
    };

    const handleClick = (questionId) => {
        if (extendedIds.includes(questionId)) {
            setExtendedIds(extendedIds.filter(id => id !== questionId));
        } else {
            setExtendedIds([...extendedIds, questionId]);
        }
    };

    return (
        <>
            <Header />
            <SearchBar onSearch={handleSearch} />
            <button id="action-btn" onClick={openAddQuestionForm}>Add Question</button>

            <Pagination id='pgntn-top'
                currIndex={currIndex}
                setCurrIndex={setCurrIndex}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                allQuestions={allQuestions}
                perPage={10}
            />
            <section id='question-container' className={isAddQuestionOpen ? 'blurred' : ''}>
                {allQuestions === null ? (
                    <p>Error loading questions.</p>
                ) : (
                    <>
                        <QuestionList
                            questions={filteredQuestions}
                            extendedIds={extendedIds}
                            handleClick={handleClick}
                            openEditQuestionForm={openEditQuestionForm}
                            handleDelete={handleDelete}
                        />
                        <Pagination id='pgntn-bottom'
                            currIndex={currIndex}
                            setCurrIndex={setCurrIndex}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            allQuestions={allQuestions}
                            perPage={10}
                        />
                    </>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </section>

            {isAddQuestionOpen && (
                <AddQuestionForm onClose={closeAddQuestionForm} />
            )}
            {isEditQuestionOpen.state && (
                <EditQuestionForm questionID={isEditQuestionOpen.questionID} onClose={closeEditQuestionForm} />
            )}
            <Footer />
        </>
    );
}