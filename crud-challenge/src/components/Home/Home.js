import React, { Component } from 'react'
import axios from 'axios';
import './Home.css';


class Home extends Component {
    constructor() {
        super()

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            salary: '',
            employees: [],
            editing: false
        }
    }

    componentDidMount() {
        axios.get('/api/allemployees').then(results => {
            this.setState(this.state.employees = results.data)
        })
        console.log(this.state.employees)
    }

    handleChange = (stateName, val) => {
        if (val === undefined) {
            val = this.state.stateName
            console.log('hit')
        }
        this.setState({
            [stateName]: val
        })
    }

    createEmployee() {
        axios.post('/api/createemployee', { first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, phone_number: this.state.phone_number, salary: this.state.salary, editing: this.state.editing }).then(results => {
            this.componentDidMount();
            this.setState({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                salary: ''
            })
        })
    }

    deleteEmployee(id) {
        axios.delete(`/api/deleteemployee/${id}`).then(results => {
            this.componentDidMount();
        })
    }

    editToggle(id) {
        this.state.editing === false ? this.setState({ editing: true }) : this.setState({ editing: false })
        axios.put(`/api/editing/${id}`, { editing: this.state.editing }).then(results => {
            this.componentDidMount();
        })
    }

    updateEmployeeInfo(id) {
        this.setState({ editing: false })
        axios.put(`/api/updateemployee/${id}`, { first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, phone_number: this.state.phone_number, salary: this.state.salary, editing: this.state.editing }).then(results => {
            this.componentDidMount();
            this.setState({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                salary: ''
            })
        })
    }

    render() {
        let displayEmployees = this.state.employees.map((e, i) => {
            if (e.editing === false) {
                return (
                    <div class="displayInputs">
                        <p>{e.first_name}</p>
                        <p>{e.last_name}</p>
                        <p>{e.email}</p>
                        <p>{e.phone_number}</p>
                        <p>{e.salary}</p>
                        <button onClick={() => this.editToggle(e.employee_id)}>Edit</button>
                        <button onClick={() => this.deleteEmployee(e.employee_id)}>Delete</button>
                    </div>
                )
            } else {
                return (
                    <div class="editInputs">
                        <input placeholder={e.first_name} type="text" onChange={(e) => this.handleChange('first_name', e.target.value)} />
                        <input placeholder={e.last_name} type="text" onChange={(e) => this.handleChange('last_name', e.target.value)} />
                        <input placeholder={e.email} type="text" onChange={(e) => this.handleChange('email', e.target.value)} />
                        <input placeholder={e.phone_number} type="text" onChange={(e) => this.handleChange('phone_number', e.target.value)} />
                        <input placeholder={e.salary} type="text" onChange={(e) => this.handleChange('salary', e.target.value)} />
                        <button onClick={() => this.updateEmployeeInfo(e.employee_id)}>Save</button>
                        <button onClick={() => this.editToggle(e.employee_id)}>Undo</button>
                        <button onClick={() => this.deleteEmployee(e.employee_id)}>Delete</button>
                    </div>
                )
            }
        })
        return (
            <div class="main">
                <div class="createInputs">
                    <input placeholder="first name" value={this.state.first_name} type="text" onChange={(e) => this.handleChange('first_name', e.target.value)} />
                    <input placeholder="last name" value={this.state.last_name} type="text" onChange={(e) => this.handleChange('last_name', e.target.value)} />
                    <input placeholder="email" type="text" value={this.state.email} onChange={(e) => this.handleChange('email', e.target.value)} />
                    <input placeholder="phone number" type="text" value={this.state.phone_number} onChange={(e) => this.handleChange('phone_number', e.target.value)} />
                    <input placeholder="salary" type="text" value={this.state.salary} onChange={(e) => this.handleChange('salary', e.target.value)} />
                    <button onClick={() => this.createEmployee()}>Add</button>
                </div>
                {displayEmployees}
            </div>
        )
    }
}

export default Home;
