import React from "react";

const TodoFooter = ({ handleSortButtons, handleClearCompleted, itemsLeftCount }) => {

    return (
        <footer className="todo-footer">
            <span id="x-items-left" className="footer-item">{itemsLeftCount} items left</span>
            <div className="desktop-sub-footer d-none d-md-block">
                <a
                    className="sort-footer-item active"
                    onClick={ handleSortButtons }
                    >All</a>
                <a
                    className="sort-footer-item"
                    onClick={ handleSortButtons }
                    >Active</a>
                <a
                    className="sort-footer-item"
                    onClick={ handleSortButtons }
                    >Completed</a>
            </div>
            <a
                className="footer-item float-right"
                onClick={ handleClearCompleted }
                >Clear Completed</a>
            <div className="mobile-sub-footer d-block d-md-none">
                <a
                    className="sort-footer-item active"
                    onClick={ handleSortButtons }
                    >All</a>
                <a
                    className="sort-footer-item"
                    onClick={ handleSortButtons }
                    >Active</a>
                <a
                    className="sort-footer-item"
                    onClick={ handleSortButtons }
                    >Completed</a>
            </div>
        </footer>
    );
};

export default TodoFooter;
