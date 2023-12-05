import React from "react";

import { useFetch } from "../../../Controllers/useFetch";

import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";


export default function ManageQuestions() {

    const { data: allQuestions, error } = useFetch("http://localhost:8080/api/fetchQuestions");
    return (
        <>
            <Header />
            <section>
                {allQuestions?.map((question_OBJ, i) => {
                    return <div>{question_OBJ.question}</div>;
                })}
                {error && <p>{error}</p>}
            </section>
            <Footer />
        </>
    );
}