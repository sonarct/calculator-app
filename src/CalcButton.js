import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class CalcButton extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.value)
  }

  render () {
    return (
      <Button onClick={this.handleClick} style={{height: '50px', width: '33%'}}>
        {this.props.value}
      </Button>
    )
  }
}

export default CalcButton
