import React, { useState } from "react";

export default function SimiliCheckBox({ text, active, effect }) {
    const [checked, setCheck] = useState('notChecked')

    const handleClick = () => {
        effect(!active)
        setCheck(active ? 'notChecked' : 'checked')
    }

    return (
        <div className='toukolai' onClick={handleClick}>
            <div id="checkboxdupauvre" className={ checked }></div>
            <p>{ text }</p>
        </div>
    )
}