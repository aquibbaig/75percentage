import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import Subjects from './Subjects'

class Login extends React.Component{
  constructor(){
    super()
    this.state = {
      username:'',
      password:'',
      verified:false,
      subjectsList:[]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    fetch('http://localhost:8000/userverify', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(this.state)
    })
    .then(response => {
      if(response.status === 200){
        return response.json()
      }
      else{
        window.alert("Kuch v enter karega nahi?")
      }
    })
    .then((data) => {
      let arr = data.subjects
      console.log(arr)
      this.setState({
        subjectsList: arr,
        verified:true
      })
      console.log(this.state)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    if(this.state.verified == false){
      return(
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
          <label>First Name:</label>
          <input type="text" name="username" placeholder="First Name" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
          <label>Password:</label>
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      )
    }
    else{
      return(
        <Subjects subjectsList={this.state.subjectsList}/>
      )
    }
  }
}

export default Login
