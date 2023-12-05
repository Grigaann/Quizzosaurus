import React from "react";
import { useState, useEffect } from "react";

import { getAllQuestions } from "../../Controllers/fetchQ&A";
import { ConcatenationScope } from "webpack";


export default function Quiz() {
    const [allQuestions, setAllQuestions] = useState([]);
    const [question, setQuestion] = useState({});

    useEffect(() => {
        console.log(getAllQuestions());
        setAllQuestions(getAllQuestions());
    }, []);

    return (<>
        <section>
            {allQuestions.map(function (question, i) {
                return <div obj={question} key={i} />;
            })}
        </section>
    </>);
}