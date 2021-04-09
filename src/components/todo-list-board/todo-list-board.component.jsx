import React from "react";
import ListInput from "../list-input/list-input.component.jsx";
import ListItemBoard from "../list-item-board/list-item-board.component.jsx";
import TodoFooter from "../todo-footer/todo-footer.component.jsx";
import ListItemData from "../../data-structures/list-item/list-item.data.js";
import OAuthContainer from "../o-auth-container/o-auth-container.component.jsx";
import LogOutText from "../log-out-text/log-out-text.component.jsx";
import { auth, registerListItemForUser, updateListItem, deleteListItem } from "../../firebase/firebase.utils.js";

class TodoListBoard extends React.Component {
    constructor(props) {
        super(props);

        const { firestoreListItems, currentUserObject } = props;
        const presetItems = [
            new ListItemData("Log in with google account to save my tasks!"),
            ListItemData.generateCompleted("Done with all boring tasks")
        ];

        const listItems = firestoreListItems || presetItems;

        this.state = {
            currentUserObject,
            inputValue: "",
            toDisplay: "all",
            listValues: listItems
        };


        function completedListItem(value) {
            const item = new ListItemData(value);

            item.completed = true;
            item.active = false;

            return item;
        }
    }

    handleInputChange = event => {
        const { value } = event.target;

        this.setState({ inputValue: value });
    }

    handleSortButtons = event => {
        // Visually update buttons
        const mobileFooterItems = document.querySelectorAll(".sort-footer-item");
        const regularFooterItems = document.querySelectorAll(".footer-item");

        const footerItems = Array.from(mobileFooterItems).concat(Array.from(regularFooterItems));

        footerItems.forEach(item => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
            }
        });

        event.target.classList.add("active");

        // Sort items to diplay
        this.setState({ toDisplay: event.target.textContent.toLowerCase() });
    };

    handleCheckboxTick = (event, itemId) => {
        const newState = tickItems.call(this, this.state);

        this.setState(prevState => newState);

        function tickItems(state) {
            return state.listValues.reduce((array, listItemObj) => {
                const { id, completed } = listItemObj;

                if (id === itemId) { // Toggle item completed
                    listItemObj.completed = !completed;
                    listItemObj.active = !listItemObj.completed;

                    // updates database
                    updateListItem(
                        this.state.currentUserObject,
                        id,
                        {
                            completed: listItemObj.completed,
                            active: listItemObj.active
                        }
                    );
                }

                array.push(listItemObj);

                return array;
            }, []);
        }
    };

    handleInputSubmit = async (event) => {
        event.preventDefault();

        let { inputValue, listValues } = this.state;

        listValues = listValues.slice();

        const newItem = new ListItemData(inputValue);

        const fireBaseId = await registerListItemForUser(
            this.state.currentUserObject,
            newItem
        );

        if (fireBaseId) {
            newItem.id = fireBaseId;
        }

        listValues.push(newItem)
        inputValue = "";

        this.setState(prevState => ({
            listValues,
            inputValue
        }));
    };

    handleClearCompleted = event => {
        let listValues = this.state.listValues.slice();

        // delete from db
        listValues.forEach(item => {
            const { completed, id } = item;

            if (completed) {
                deleteListItem(
                    this.state.currentUserObject,
                    id
                );
            }
        });

        listValues = listValues.filter(item => !item.completed);

        this.setState({ listValues });
    };

    countItemsLeft = () => {
        const { listValues } = this.state;

        return listValues.filter(obj => obj.active).length;
    }

    render() {
        return (
            <div className="todo-list-board">
                <h2 className="todo-header">TODO</h2>
                { auth.currentUser ? <LogOutText /> : <OAuthContainer /> }
                <ListInput
                    handleChange={ this.handleInputChange }
                    handleSubmit={ this.handleInputSubmit }
                    value={ this.state.inputValue }
                    />
                <ListItemBoard
                    handleCheckboxTick={ this.handleCheckboxTick }
                    toDisplay={ this.state.toDisplay }
                    listValues={ this.state.listValues }
                    />
                <TodoFooter
                    handleSortButtons={ this.handleSortButtons }
                    handleClearCompleted={ this.handleClearCompleted }
                    itemsLeftCount={ this.countItemsLeft() }
                    />
            </div>
        );
    }
}

export default TodoListBoard;
