import React from 'react'
import {Card, Button} from 'semantic-ui-react'


class Subjects extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      attended:'',
      tabled:''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e) => {
    console.log(e.target.value)
  }

  render(){
    return(
      <div>{this.props.subjectsList.map((person, index) => (
        <Card>
          <Card.Content>
            <Card.Header id="hey">{person}</Card.Header>
            <Card.Meta>You have selected this subject</Card.Meta>
            <Card.Description>
              Attend all subjects <strong>75% or more</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.handleClick} value={person}>
                Tabled
              </Button>
              <Button basic color='red' onClick={this.handleClick} value={person}>
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
