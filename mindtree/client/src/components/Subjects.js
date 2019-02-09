import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import 'whatwg-fetch'


class Subjects extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      attended:false,
      tabled:false,
      subjectsList:[]
    }
    this.handletableClick = this.handletableClick.bind(this)
    this.handleattendClick = this.handleattendClick.bind(this)
  }

  componentDidMount(){
    fetch('http://localhost:8000/getDetails', {
      method:'GET'
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
      console.log(data)
      this.setState({
        subjectsList:data
      })
      console.log(this.state.subjectsList)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // componentDidUpdate(){
  //   fetch('http://localhost:8000/getDetails', {
  //     method:'GET'
  //   })
  //   .then(response => {
  //     if(response.status === 200){
  //       return response.json()
  //     }
  //     else{
  //       window.alert("Kuch v enter karega nahi?")
  //     }
  //   })
  //   .then((data) => {
  //     console.log(data)
  //     this.setState({
  //       subjectsList:data
  //     })
  //     console.log(this.state.subjectsList)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }
  //
  // forceUpdateHandler = () => {
  //   this.forceUpdate()
  // }

  handletableClick = (e) => {
    var subject = e.target.value
    fetch(`http://localhost:8000/tabled/${subject}`, {
      method:'GET'
    })
    .then(res => {
      console.log(res)
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleattendClick = (e) => {
    var subject = e.target.value
    fetch(`http://localhost:8000/attend/${subject}`, {
      method:'GET'
    })
    .then(res => {
      console.log(res)
      window.location.reload();
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    return(
      <div>{this.state.subjectsList.map((subject, index) => (
        <Card>
          <Card.Content>
            <Card.Header id="hey">{subject.subjectname}</Card.Header>
            <Card.Meta>You have selected this subject</Card.Meta>
            <Card.Description>
              Tabled <strong>{subject.tabled}</strong>
            </Card.Description>
            <Card.Description>
              Attended <strong>{subject.attended}</strong>
            </Card.Description>
            <Card.Description>
                Metric <strong>{subject.attended/subject.tabled*100}%</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.handletableClick} value={subject.subjectname}>
                Tabled
              </Button>
              <Button basic color='red' onClick={this.handleattendClick} value={subject.subjectname}>
                Attended
              </Button>
            </div>
          </Card.Content>
        </Card>
          ))}
    </div>
    )
  }
}

export default Subjects
