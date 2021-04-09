import React from "react";

const StyledCheckbox = ({ listItemId, handleChange, ...otherProps }) => (
    <div className="styled-checkbox-group">
        <input
            className="styled-checkbox"
            onChange={ event => handleChange(event, listItemId) }
            { ...otherProps }
            />
        <div className="main-circle">
            <div className="secondary-circle"></div>
        </div>
    </div>
);

export default StyledCheckbox;
