import React from "react";
import StyledCheckbox from "../styled-checkbox/styled-checkbox.component.jsx";

const ListInput = ({ handleChange, handleSubmit, ...otherProps }) => (
    <div className="list-input-container">
        <form id="list-input-form" onSubmit={ handleSubmit }>
            <StyledCheckbox handleChange={() => null} />
            <input
                className="styled-text-input"
                type="text"
                name="add-item"
                onChange={ handleChange }
                onSubmit={ () => alert("he") }
                placeholder="Create a new todo..."
                { ...otherProps }
                />
            <input style={{display: "none"}} type="submit" />
        </form>
    </div>
);

export default ListInput;
