import React, {Component} from 'react'
import {Grid, Row, Col, Well} from 'react-bootstrap'
import CalcInput from './CalcInput'
import CalcButtonList from './CalcButtonList'
import calculate from './logic'

class Calculator extends Component {
  constructor (props) {
    super(props)

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleInputText = this.handleInputText.bind(this)
    this.testInput = this.testInput.bind(this)
    this.testInput2 = this.testInput2.bind(this)

    this.state = {
      expression: '',
      answer: '',
      isValid: false
    }
  }

  validateExpression () {
    const expr = this.state.expression.toString()
    let result = calculate(expr)
    this.setState({...result})
  }

  handleButtonClick (e) {
    switch (e) {
      case 'D':
        console.log('D')
        this.setState((prevState) => {
          console.log(prevState.expression)
          if (prevState.expression.length > 0) {
            prevState.expression = prevState.expression.slice(0, -1)
            prevState.answer = ''
            prevState.isValid = false
          }
        })
        break

      case 'C':
        console.log('C')
        this.setState({
          expression: '',
          isValid: false,
          answer: ''
        })
        break

      case '=':
        console.log('=')
        this.validateExpression()
        break

      default:
        console.log('num')
        this.setState((prevState) => {
          prevState.expression += e
        })
        break
    }
  }

  handleInputText (e) {
    this.setState((prevState) => {
      prevState.expression += e
    })
  }

  testInput () {
    let expression = '1+(23*65-(98/34+5*9))-(37/2)*6'
    this.setState({
      expression,
      isValid: false,
      answer: ''
    }, () => {
      this.validateExpression()
    })
  }

  testInput2 () {
    let expression = '1+(23*65-(98/34+5*9))-(37/2))*6'
    this.setState({
      expression,
      isValid: false,
      answer: ''
    }, () => {
      this.validateExpression()
    })
  }

  render () {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} md={8} mdOffset={2}>

              <CalcInput
                expression={this.state.expression}
                onChange={this.handleInputText} />

            </Col>
          </Row>
          <Row>
            <Col lg={8} md={8} mdOffset={2}>

              <CalcButtonList onClick={this.handleButtonClick} />

            </Col>
          </Row>
          <Row>
            <Col lg={8} md={8} mdOffset={2}>
              <Well>
                {this.state.answer}
              </Well>
              <div style={{backgroundColor: 'green', width: '100px', height: '100px'}} onClick={this.testInput}>
                Check
              </div>
              <div style={{backgroundColor: 'red', width: '100px', height: '100px'}} onClick={this.testInput2}>
                Check
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Calculator
