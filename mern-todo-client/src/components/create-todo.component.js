import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            responsible: '',
            priority: '',
            completed: false,
        }
    }

    componentDidMount() {
      // Fetch does not send cookies. So you should add credentials: 'include'
      fetch("http://localhost:4000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      })
        .then(response => {
          if (response.status === 200) return response.json();
          throw new Error("Failed to authenticate user");
        })
        .then(responseJson => {
          this.setState({
            authenticated: true,
            user: responseJson.user
          });
        })
        .catch(error => {
          this.setState({
            authenticated: false,
            error: "Failed to authenticate user"
          });
        });
    }

    onChangeTodoDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.description}`);
        console.log(`Todo Responsible: ${this.state.responsible}`);
        console.log(`Todo Priority: ${this.state.priority}`);
        console.log(this.state);

        const newTodo = {
            description: this.state.description,
            responsible: this.state.responsible,
            priority: this.state.priority,
            completed: this.state.completed,
            creatorId: this.state.user.passportStrategyId,
        };

        axios.post('http://localhost:4000/todos', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            description: '',
            responsible: '',
            priority: '',
            completed: false
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.responsible}
                            onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.priority === 'Low'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.priority === 'Medium'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.priority === 'High'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
