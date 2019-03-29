import React, { Component } from 'react'
import axios from 'axios';


class Home extends Component {
    constructor(){
        super()

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            salary: '',
            employees: []
        }
    }

    componentDidMount(){
        axios.get('/api/allemployees').then(results => {
            this.setState(this.state.employees = results.data)
        })
        console.log(this.state.employees)
    }

    handleChange = (stateName ,val) => {
        this.setState({
            [stateName]: val
        })
    }

    createEmployee(){
        axios.post('/api/createemployee', {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, phone_number: this.state.phone_number, salary: this.state.salary}).then(results => {
            this.componentDidMount();
        })
    }

    deleteEmployee(id){
        axios.delete(`/api/deleteemployee/${id}`).then(results => {
            this.componentDidMount();
        })
    }

  render() {
      let displayEmployees = this.state.employees.map((e,i) => {
          return(
              <div>
                  <p>{e.first_name}</p>
                  <p>{e.last_name}</p>
                  <p>{e.email}</p>
                  <p>{e.phone_number}</p>
                  <p>{e.salary}</p>
                  <button>Edit</button>
                  <button onClick={() => this.deleteEmployee(e.employee_id)}>Delete</button>
              </div>
          )
      })
    return (
      <div>
        <input placeholder="first name"  type="text" onChange={(e) => this.handleChange('first_name', e.target.value)}/>
        <input placeholder="last name" type="text" onChange={(e) => this.handleChange('last_name', e.target.value)}/>
        <input placeholder="email" type="text" onChange={(e) => this.handleChange('email', e.target.value)}/>
        <input placeholder="phone number" type="text" onChange={(e) => this.handleChange('phone_number', e.target.value)}/>
        <input placeholder="salary" type="text" onChange={(e) => this.handleChange('salary', e.target.value)}/>
        <button onClick={() => this.createEmployee()}>Add</button>
        {displayEmployees}
      </div>
    )
  }
}

export default Home;
