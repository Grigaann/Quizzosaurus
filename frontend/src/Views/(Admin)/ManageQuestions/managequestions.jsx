import React, { useMemo, useState } from 'react';
import { SearchBar } from '../../Components/SearchBar/searchbar';
import { useFetch } from '../../../Controllers/useFetch';

import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import { AddQuestionForm } from './Components/AddQuestionForm/addquestionform';

import './managequestions.css';

export default function ManageQuestions() {
    const { data: allQuestions, error } = useFetch(`${process.env.REACT_APP_API_URL}/api/fetchQuestions`);
    const [searchTerm, setSearchTerm] = useState('');
    const [extendedIds, setExtendedIds] = useState([]);
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);

    const filteredQuestions = useMemo(() => {
        if (!allQuestions) {
            return [];
        }

        return allQuestions.filter(question =>
            question.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allQuestions, searchTerm]);

    const handleSearch = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    const openAddQuestionForm = () => {
        setIsAddQuestionOpen(true);
    };

    const closeAddQuestionForm = () => {
        setIsAddQuestionOpen(false);
    };

    const handleEdit = (questionId) => {
        console.log(`Editing question with ID: ${questionId}`);
    };

    const handleDelete = (questionId) => {
        console.log(`Deleting question with ID: ${questionId}`);
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
            <section id='question-container' className={isAddQuestionOpen ? 'blurred' : ''}>
                {allQuestions === null ? (
                    <p>Error loading questions.</p>
                ) : (
                    <>
                        {filteredQuestions && filteredQuestions.length > 0 ? (
                            filteredQuestions.map((question_OBJ, alternate_colours) => (
                                <div
                                    key={question_OBJ.id}
                                    className={`question-container ${alternate_colours % 2 === 0 ? "colour1" : "colour2"} ${extendedIds.includes(question_OBJ.id) ? "extended" : ""}`}
                                    onClick={() => handleClick(question_OBJ.id)}
                                >
                                    <div className='question-header'>
                                        <p>{question_OBJ.question}</p>
                                        <div className="question-actions">
                                            <span onClick={() => handleEdit(question_OBJ.id)}>✏️</span>
                                            <span onClick={() => handleDelete(question_OBJ.id)}>❌</span>
                                        </div>
                                    </div>
                                    <div id="shrinks">
                                        {Object.keys(question_OBJ).map((items) => {
                                            if (items.includes('res')) {
                                                const key = items;
                                                return (
                                                    <p key={key} className={"answers " + (alternate_colours % 2 === 0 ? "colour2" : "colour1")} id={`answer${key}`}>
                                                        {question_OBJ[items]}
                                                    </p>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>{allQuestions && allQuestions.length > 0 ? 'No matching questions.' : 'No questions available.'}</p>
                        )}
                    </>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </section>

            {isAddQuestionOpen && (
                <div className="modal-background">
                    <AddQuestionForm onClose={closeAddQuestionForm} />
                </div>
            )}

            <Footer />
        </>
    );
}
