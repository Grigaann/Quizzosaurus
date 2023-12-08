import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti';

import { useFetch } from "../../../Controllers/useFetch";

import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

import axios from "axios";

import "./quiz.css"


export default function Quiz() {
    const [isLoading, setLoading] = useState(false);
    const [streak, setStreak] = useState(() => Number(localStorage.getItem('streak')) || 0);
    const [confetti, setConfetti] = useState(false);
    const [showTrashTalk, setShowTrashTalk] = useState(false);
    const { data: question_OBJ, error } = useFetch(`${process.env.REACT_APP_API_URL}/api/getRandomQuestion`);
    const trashTalkSentences = [
        "You really didn't do your homework, did you?",
        "Are you doing it on purpose ?",
        "I’m sure you knew the answer. You just wanted to keep things interesting, right?",
        "Don’t worry, the correct answers are overrated anyway.",
        "Who needs correct answers when you’ve got style?",
        "Remember, it’s not about winning, it’s about… Oh wait, it is."
    ];
    
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
                document.getElementById('answer' + question_OBJ.correct).classList.add('good_answer');
                if (!updated.data.userAns)
                    document.getElementById('answer' + key).classList.add("wrong_answer");
                setStreak(updated.data.streak);
                if (parseInt(key) === question_OBJ.correct) {
                    setConfetti(true);
                }
                if (updated.data.streak < 0 && updated.data.streak % 5 === 0) {
                    setShowTrashTalk(true); 
                } else {
                    setShowTrashTalk(false);
                }
                new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
                    window.location.reload();
                })
            });
    };

    return (
        <>      
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"></link>
            <Header />
            <section id="quiz-container">
                {confetti && <Confetti />}
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
                <div className="trash">
                    {showTrashTalk && <p id="trashtalk"><strong>{trashTalkSentences[Math.floor(Math.random() * trashTalkSentences.length)]}</strong></p>}
                </div>
            </section >
            <Footer />
        </>
    );
};