import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

// Components
import { Route, Switch } from "react-router-dom";
import { auth, registerUserInDatabase, retrieveUserListItems } from "./firebase/firebase.utils.js";

// Pages
import TodoListPage from "./pages/todo-list/todo-list.page.jsx";

class App extends React.Component {

    constructor() {
        super();

        this.unsubscribeAuth = null;

        this.state = {
            currentUserObject: null,
            firestoreListItems: [],
            loaded: false
        };
    }

    componentDidMount() {
        this.unsubscribeAuth = auth.onAuthStateChanged( async function(user) {
            if (user) {
                await registerUserInDatabase(user);
                const retrievedListItems = await retrieveUserListItems(user);

                this.setState({
                    currentUserObject: user,
                    firestoreListItems: retrievedListItems,
                    loaded: true
                });

            } else {
                this.setState({
                    currentUserObject: null,
                    firestoreListItems: null,
                    loaded: true
                });
            }
        }.bind(this));
    }

    componentWillUnmount() {
        if (this.unsubscribeAuth) this.unsubscribeAuth();
    }

    renderTodoListPage = () => {
        return (
            <TodoListPage
                currentUserObject={ this.state.currentUserObject }
                firestoreListItems={ this.state.firestoreListItems } />
        );
    }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={
                        () => this.state.loaded && this.renderTodoListPage()
                    }
                />
            </Switch>
        );
    }
}

export default App;
