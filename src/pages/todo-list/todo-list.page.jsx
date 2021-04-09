import React from "react";
import TodoListBoard from "../../components/todo-list-board/todo-list-board.component.jsx";
import { Container, Row, Col } from "react-bootstrap";
import desktopBgPath from "../../assets/images/bg-desktop-dark.jpg";
import mobileBgPath from "../../assets/images/bg-mobile-dark.jpg";

const TodoListPage = (props) => (
    <section id="todo-list-page">
        <div className="bg-img-wrapper">
            <img className="d-none d-sm-block" src={desktopBgPath} />
            <img className="d-block d-sm-none" src={mobileBgPath} />
        </div>
        <Container>
            <Row>
                <Col className="d-none d-md-block" md={1} lg={2} />
                <Col xs={12} md={10} lg={8}>
                    <TodoListBoard { ...props } />
                </Col>
            </Row>
        </Container>
    </section>
);

export default TodoListPage;
