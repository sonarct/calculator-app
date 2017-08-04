import React, {Component} from 'react'
import {FormControl, ControlLabel, Grid, Row, Col} from 'react-bootstrap'
import CalcButtonList from './CalcButtonList'
import evaluate from './logic'
import './styles.css'

class Calculator extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)

    this.state = {
      value: '',
      answer: ''
    }
  }

  getValidationState () {
    if (this.props.error) {
      return 'error'
    } else {
      return 'success'
    }
  }

  onSubmit (e) {
    e.preventDefault()
    this.evaluateExpression()
  }

  handleChange (e) {
    const value = e.target ? e.target.value : e
    this.setState({value}, () => {
      this.evaluateExpression()
    })
  }

  handleButtonClick (e) {
    let value = this.state.value

    switch (e) {
      case 'D':

        if (value && value.length > 0) {
          value = value.slice(0, value.length - 1)
        } else {
          value = ''
        }

        this.setState({
          value,
          answer: ''
        })
        break

      case 'C':
        this.setState({
          value: '',
          answer: ''
        })
        break

      case '=':
        this.evaluateExpression()
        break

      default:
        value = [value, e].join('')
        this.handleChange(value)
        break
    }
  }

  evaluateExpression () {
    const expr = this.state.value.toString()
    if (!expr) {
      this.setState({answer: ''})
      return
    }
    let result = evaluate(expr)
    this.setState({answer: result})
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <h3>Calculator App</h3>
            <Row className='calc-input-row'>
              <Col xs={8} md={8}>
                <form onSubmit={this.onSubmit}>
                  <ControlLabel>
                    Input your expression
                  </ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.value}
                    placeholder='Enter expression'
                    onChange={this.handleChange}
                    className='calc-input'
                    autoFocus
                  />
                </form>
              </Col>
              <Col xs={4} md={4}>
                <ControlLabel>
                  Result
                </ControlLabel>
                <FormControl
                  componentClass='textarea'
                  type='text'
                  value={this.state.answer}
                  placeholder='Result'
                  className='calc-input'
                />
              </Col>
            </Row>
            <Row className='calc-btn-block'>
              <CalcButtonList onClick={this.handleButtonClick} />
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Calculator
