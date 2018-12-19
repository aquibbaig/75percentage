import React from 'react'
import {Form, Button, Card, Image, Dropdown} from 'semantic-ui-react'

import { subjectList } from './extra'
import axios from 'axios'


class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      today:0,
      attended:0
    }
  }

  render(){
    return(
      <div>Dashboard component</div>
    )
    }
  }

export default Dashboard;
