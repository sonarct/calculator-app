import React, {Component} from 'react'
import {FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap'

class CalcInput extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  getValidationState () {
    if (this.props.error) {
      return 'error'
    } else {
      return 'success'
    }
  }

  handleChange (e) {
    const value = e.target.value.slice(-1)
    this.props.onChange(value)
  }

  render () {
    return (
      <div>
        <FormGroup
          controlId='formBasicText'
          validationState={this.getValidationState()}
        >
          <ControlLabel>
            Input your expression
          </ControlLabel>
          <FormControl
            type='text'
            value={this.props.expression}
            placeholder='Enter expression'
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>
            {this.props.error}
          </HelpBlock>
        </FormGroup>
      </div>
    )
  }
}

export default CalcInput
