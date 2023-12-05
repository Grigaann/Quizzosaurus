import React from "react";

import { useFetch } from "../../../Controllers/useFetch";

import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";


export default function Quiz() {
    const { data: question_OBJ, error } = useFetch("http://localhost:8080/api/getRandomQuestion");
    return (
        <>
            <Header />
            <section>
                {question_OBJ !== null && <div id="questionAske">{question_OBJ.question}</div>}
                {question_OBJ !== null && (
                    <div id="possibleAnswers">
                        {Object.keys(question_OBJ).map((col) => {
                            if (col.includes("res")) {
                                return (
                                    <div className="answer" key={col}>
                                        {question_OBJ[col]}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
                {error && <p>{error}</p>}
            </section>
            <Footer />
        </>
    );
};