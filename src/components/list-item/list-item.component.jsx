import React from "react";
import StyledCheckbox from "../styled-checkbox/styled-checkbox.component.jsx";

const ListItem = ({ value, completed, id, handleCheckboxTick, ...otherProps}) => {
    const completedClass = completed ? "completed" : "";

    return (
        <div className="list-item-wrapper">
            <StyledCheckbox
                handleChange={ handleCheckboxTick }
                listItemId={ id }
                checked={ completed }
                type="checkbox"
                name="checkbox"
                />
            <p className={ `list-item ${completedClass}` }>{ value }</p>
        </div>
    );
};

export default ListItem;
