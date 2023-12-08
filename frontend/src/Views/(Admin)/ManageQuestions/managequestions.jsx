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
    const [currentPage, setCurrentPage] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [extendedIds, setExtendedIds] = useState([]);
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    const [isEditQuestionOpen, setIsEditQuestionOpen] = useState({ state: false, qestionID: null });
    const [loading, setLoading] = useState(true);

    const filteredQuestions = useMemo(() => {
        if (!allQuestions) {
            return [];
        }

        return allQuestions.filter(question =>
            question.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allQuestions, searchTerm]);

    const [totalPages, startIndex, endIndex, currIndex, setCurrIndex, perPage] = usePagination(10, filteredQuestions ? filteredQuestions.length : 0);

    useEffect(() => {
        if (filteredQuestions) {
            setCurrentPage(filteredQuestions.slice(startIndex, endIndex + 1));
        }
    }, [filteredQuestions, startIndex, endIndex]);

    useEffect(() => {
        if (filteredQuestions) {
            setLoading(false);
        }
    }, [filteredQuestions]);

    const handleSearch = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    const openAddQuestionForm = () => {
        setIsAddQuestionOpen(true);
    };

    const closeAddQuestionForm = () => {
        setIsAddQuestionOpen(false);
    };

    const openEditQuestionForm = (id) => {
        setIsEditQuestionOpen({ state: true, questionID: id });
    };

    const closeEditQuestionForm = () => {
        setIsEditQuestionOpen({ state: false, questionID: null });
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
            {loading && <p>Loading questions...</p>}
            {!loading && allQuestions && (
                <>
                    <button id="action-btn" onClick={openAddQuestionForm}>Add Question</button>

                    <section id='question-container' className={(isAddQuestionOpen || isEditQuestionOpen.state) ? 'blurred' : ''}>
                        {filteredQuestions.length <= perPage ? <></> : (
                            <Pagination
                                currIndex={currIndex}
                                setCurrIndex={setCurrIndex}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                                allQuestions={currentPage}
                                perPage={perPage}
                            />
                        )}
                        <QuestionList
                            questions={currentPage}
                            extendedIds={extendedIds}
                            handleClick={handleClick}
                            openEditQuestionForm={openEditQuestionForm}
                            handleDelete={handleDelete}
                        />
                        {filteredQuestions.length <= perPage ? <></> : (
                            <Pagination
                                currIndex={currIndex}
                                setCurrIndex={setCurrIndex}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                                allQuestions={currentPage}
                                perPage={perPage}
                            />
                        )}
                    </section>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            )}
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
