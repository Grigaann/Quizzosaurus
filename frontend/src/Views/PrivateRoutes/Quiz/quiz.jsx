import React, { useState, useEffect } from "react";

import { useFetch } from "../../../Controllers/useFetch";

import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

import axios from "axios";

import "./quiz.css"


export default function Quiz() {
    const [isLoading, setLoading] = useState(false);
    const [streak, setStreak] = useState(() => Number(localStorage.getItem('streak')) || 0);

    const { data: question_OBJ, error } = useFetch(`${process.env.REACT_APP_API_URL}/api/getRandomQuestion`);


    useEffect(() => {
        localStorage.setItem('streak', streak);
    }, [streak]);

    const handleClick = (key) => {
        setLoading(true);
        axios.patch(`${process.env.REACT_APP_API_URL}/api/verifyAnswer`,
            {
                userAns: parseInt(key) === question_OBJ.correct, corAns: question_OBJ[`res${question_OBJ.correct}`],
                streak
            },
            { withCredentials: true })
            .then((updated) => {
                document.getElementById('answer' + question_OBJ.correct).classList.add('good_answer')
                if (!updated.data.userAns)
                    document.getElementById('answer' + key).classList.add("wrong_answer");
                setStreak(updated.data.streak);

                new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
                    window.location.reload();
                })
            });
    };

    return (
        <>
            <Header />
            <section id="quiz-container">
                {question_OBJ !== null && <div id="question-asked">{question_OBJ.question}</div>}
                {question_OBJ !== null && (
                    <div id="possible-answers">
                        {Object.keys(question_OBJ).map((items) => {
                            if (Array.isArray(question_OBJ[items])) {
                                return question_OBJ[items].map((item) => {
                                    const key = item.res;
                                    return (
                                        <button key={key} className="answer" id={"answer" + key} onClick={() => handleClick(key)} disabled={isLoading}>
                                            {item.text}
                                        </button>
                                    );
                                });
                            }
                            return null;
                        })}
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </section >
            <Footer />
        </>
    );
};