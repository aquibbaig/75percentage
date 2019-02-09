import React from 'react'
import {Form, Button, Dropdown} from 'semantic-ui-react'
import 'whatwg-fetch'
import 'semantic-ui-css/semantic.min.css'
import {subjectList} from './extra'

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username:'',
      password: '',
      loggedIn:false,
      subjects:[]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value,
    })
  }

  handlesubChange = (e, data) => {
     this.setState({
       subjects: data.value
     })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log("State data is:" + JSON.stringify(this.state))
    fetch('http://localhost:8000/users', {
      method:'POST',
      body:JSON.stringify(this.state),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res => {
      console.log((res).status)
      if(res.status === 200){
        this.setState({
          loggedIn:true
        })
      }
      else{
        window.alert('User exists, Please login')
      }
      console.log(this.state.loggedIn)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    if(this.state.loggedIn === false){
      return(
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>First Name:</label>
          <input type="text" name="username" placeholder="First Name" onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Password:</label>
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
        </Form.Field>
        <h3>Select Subjects</h3>
           <Dropdown options={subjectList}  fluid multiple search selection onChange={this.handlesubChange} />
           <Button type="submit">Submit</Button>
        </Form>
        <br/>
        <br/>
        <Button href="/login">Login</Button>
      </div>
    )}
    else{
      return(
          <Button href="/login">Login</Button>
      )
    }
  }
}


export default Home;
