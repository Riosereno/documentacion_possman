import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const initialUser = { firstname: "", lastname: "", email: "", password: "", birthday: "" }

const UsersForm = ({ getUsers, showSuccessNotf, showFailNotf, setIsLoading, userSelected, deselectUser }) => {

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (userSelected) reset(userSelected);
        else reset(initialUser)
    }, [userSelected])

    const submit = (data) => {
        setIsLoading(true);
        if (userSelected) {
            // endpoint PUT -> /users/:id
            axios.put(`https://users-crud.fly.dev/api/v1/users/${userSelected.id}`, data)
                .then(() => {
                    getUsers();
                    showSuccessNotf("User updated successfully");
                    deselectUser();
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        } else {
            // endpoint POST -> /users
            axios.post('https://users-crud.fly.dev/api/v1/users', data)
                .then(() => {
                    getUsers()
                    showSuccessNotf("User created successfully")
                    reset(initialUser)
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <Form style={{ maxWidth: 900 }} className="mx-auto mb-5" onSubmit={handleSubmit(submit)}>
            <h1>New User</h1>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="user.firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" {...register("firstname")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="user.lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" {...register("lastname")} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="user.email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register("email")} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="user.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" {...register("password")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="user.birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" {...register("birthday")} />
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit" className="mt-3">
                Submit
            </Button>
            {userSelected && (
                <Button onClick={deselectUser} variant="secondary" className="mt-3">
                    Clear
                </Button>
            )}
        </Form>
    );
};

export default UsersForm;
