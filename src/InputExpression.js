import React, {Component} from 'react'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'

class InputExpression extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      value: ''
    }
  }

  getValidationState () {
    return 'success'
  }

  handleChange (e) {
    const value = e.target.value
    this.setState({ value }, () => { })
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
            value={this.state.value}
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

export default InputExpression
