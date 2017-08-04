import React, {Component} from 'react'

class CalcButton extends Component {
  handleClick = () => {
    this.props.onClick(this.props.value)
  }

  render () {
    return (
      <div onClick={this.handleClick} className='calc-btn'>
        {this.props.value}
      </div>
    )
  }
}

export default CalcButton
