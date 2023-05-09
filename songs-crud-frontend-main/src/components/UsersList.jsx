import axios from 'axios';
import React from 'react';
import { Badge, Button, ListGroup, Table } from 'react-bootstrap';

const UsersList = ({ users, getUsers, showSuccessNotf, showFailNotf, setIsLoading, selectUser }) => {

    const deleteUser = id => {
        setIsLoading(true);
        // endpoint DELETE -> /users/:id
        axios.delete(`https://users-crud.fly.dev/api/v1/users/${id}`)
            .then(() => {
                getUsers();
                showSuccessNotf("User removed successfully");
            })
            .catch(() => showFailNotf())
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Birthday</th>
                        <th>Password</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>   
                {
                    users.map(user => {

                        return (
                            <tr key={user.id}>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.birthday}</td>
                                <td>{user.password}</td>
                                <td>
                                    <Button 
                                        variant='danger'
                                        size='sm'
                                        className="me-1"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        variant='warning'
                                        size='sm'
                                        onClick={() => selectUser(user)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};

export default UsersList;
