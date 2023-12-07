import React, { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../../../../../../Controllers/useFetch';

import { InputText } from '../../../../../Components/InputText/inputtext';

import axios from 'axios';

import '../questionform.css';

export const EditQuestionForm = ({ questionID, onClose }) => {
    const { data: initial } = useFetch(`${process.env.REACT_APP_API_URL}/api/getQuestion/${questionID}`);
    const reset = useMemo(() => ({
        question: initial?.question || '',
        category: initial?.category || '',
        res1: initial?.res1 || '',
        res2: initial?.res2 || '',
        res3: initial?.res3 || '',
        res4: initial?.res4 || '',
        correct: initial?.correct || '',
    }), [initial]);

    const [formData, setFormData] = useState(reset);

    useEffect(() => {
        if (initial) {
            setFormData(reset);
        }
    }, [reset, initial]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/api/editQuestion/${questionID}`, { formData }, (err) => {
            if (err) throw err;
        });
        setFormData(reset);
        onClose();
    };

    const handleCancel = () => {
        setFormData(reset);
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>Add New Question</h2>
                <form onSubmit={handleSubmit}>
                    <label name="question_label">Question:</label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                    />
                    {/* <label name="category_label">Category:</label> */}
                    <input
                        type="hidden"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                    {[1, 2, 3, 4].map((nb) => (
                        <InputText
                            key={nb}
                            label={`Option ${nb}`}
                            fieldId={`res${nb}`}
                            fieldName={`Option ${nb}`}
                            value={formData["res" + nb]}
                            onChange={handleChange}
                            required
                        />
                    ))}
                    <label name="correct_label">Correct Answer:</label>
                    <select
                        id="correct"
                        name="correct"
                        value={formData.correct}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                    </select>
                    <div id="form-buttons">
                        <button className="button-form" type="submit">Modify</button>
                        <button className="button-form" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
