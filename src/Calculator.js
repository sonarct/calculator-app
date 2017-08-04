import React, {Component} from 'react'
import {Grid, Row, Col, Well} from 'react-bootstrap'
import CalcInput from './CalcInput'
import CalcButtonList from './CalcButtonList'
import evaluate from './logic'

class Calculator extends Component {
  constructor (props) {
    super(props)

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleInputText = this.handleInputText.bind(this)
    this.testInput = this.testInput.bind(this)
    this.testInput2 = this.testInput2.bind(this)

    this.state = {
      expression: '',
      answer: ''
    }
  }

  validateExpression () {
    const expr = this.state.expression.toString()
    let result = evaluate(expr)
    this.setState({answer: result})
    console.log(typeof this.state.answer)
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
          }
        })
        break

      case 'C':
        console.log('C')
        this.setState({
          expression: '',
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
    let expression = '1+(-23*65/12/2/3-(-98/34+5*9))-(37/2)*6'
    // let expression = '-1.0321+1.4234-1.2421-0.21314+1+1-2'
    this.setState({
      expression,
      answer: ''
    }, () => {
      this.validateExpression()
    })
  }

  testInput2 () {
    // let expression = '1.0321+1.4234-1.2421-0.21314+1+1-2'
    let expression = '3+2*4+(6-2)/3'
    this.setState({
      expression,
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
