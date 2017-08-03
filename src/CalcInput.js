import React, {Component} from 'react'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'

class CalcInput extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  getValidationState () {
    return 'success'
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
          <FormControl
            type='text'
            value={this.props.expression}
            placeholder='Enter expression'
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </div>
    )
  }
}

export default CalcInput
