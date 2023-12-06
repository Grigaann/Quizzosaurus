import React from "react";

import { useFetch } from "../../../Controllers/useFetch";

import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";


export default function ManageQuestions() {

    const { data: allQuestions, error } = useFetch(`${process.env.REACT_APP_API_URL}/api/fetchQuestions`);
    return (
        <>
            <Header />
            <section>
                {allQuestions?.map((question_OBJ, i) => {
                    return <div><p>{question_OBJ.question}</p><p>{question_OBJ["res1"]}</p></div>;
                })}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </section>
            <Footer />
        </>
    );
}