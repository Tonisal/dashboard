import React from "react";
import axios from "axios";

import { Card } from "react-bootstrap";

class Dummy extends React.Component {
    state = {
        users: [],
    }

    componentDidMount() {
        this.getDataFromAPI();
    }

    getDataFromAPI = async () => {
        let res;
        try {
            res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            console.log(res.data);
            const dataObj = {'data': res.data};
            localStorage.setItem('users', JSON.stringify(dataObj));
            this.setState({
                users: res.data,
            })
        } catch(err) {
            this.handleConnectionError(err);
        }
    }

    handleConnectionError = (err) => {
        if (err.message === 'Network Error') {
            console.log('Network Error');
            const data = JSON.parse(localStorage.getItem('users'));
            this.setState({
                users: data.data,
            })
            console.log(data);
        }

    }




    render() {
        return (
            <div className="pt-5">
                <h1>hello world dummy</h1>
                {this.state.users.map(user =>
                    <Card>
                        <Card.Header className="text-center">{user.name}</Card.Header>
                        <Card.Body>
                            <ul>
                                <li>{user.email}</li>
                            </ul>
                        </Card.Body>
                    </Card>
                )}
            </div>
        )
    }
}

export default Dummy;