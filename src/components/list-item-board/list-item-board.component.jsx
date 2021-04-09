import React from "react";
import ListItem from "../list-item/list-item.component.jsx";

const ListItemBoard = ({ listValues, toDisplay, handleCheckboxTick }) => (
    <div className="list-item-board">
        {
            listValues.reduce((array, listObj, id) => {
                if (toDisplay === "all") {
                    array.push(
                        <ListItem key={id} handleCheckboxTick={handleCheckboxTick} {...listObj } />
                    );
                } else {
                    // if completed or active
                    if (listObj[toDisplay]) {
                        array.push(
                            <ListItem key={id} handleCheckboxTick={handleCheckboxTick} {...listObj } />
                        );
                    }
                }

                return array;
            }, [])
        }
    </div>
);

export default ListItemBoard;
