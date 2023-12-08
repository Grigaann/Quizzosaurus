import React from "react";

export default function QuestionList({ questions, extendedIds, handleClick, openEditQuestionForm, handleDelete }) {
    return questions.map((question_OBJ, alternate_colours) => (
        <div
            key={question_OBJ.id}
            className={`question-container ${alternate_colours % 2 === 0 ? "colour1" : "colour2"} ${extendedIds.includes(question_OBJ.id) ? "extended" : ""}`}
            onClick={() => handleClick(question_OBJ.id)}
        >
            <div className='question-header'>
                <p>{question_OBJ.question}</p>
                <div className="question-actions">
                    <span onClick={() => openEditQuestionForm(question_OBJ.id)}>✏️</span>
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
    ));
}