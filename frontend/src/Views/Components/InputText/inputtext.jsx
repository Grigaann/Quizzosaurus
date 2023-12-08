import React from 'react';

export const InputText = ({ label, fieldId, fieldName, value, onChange, required }) => (
    <>
        <label name={`${fieldId}_label`}>{label}:</label>
        <input
            type="text"
            id={fieldId}
            name={fieldName}
            value={value}
            onChange={onChange}
            required={required}
        />
    </>
);
