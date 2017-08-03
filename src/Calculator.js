import React, {Component} from 'react'
import {Grid, Row, Col, Well} from 'react-bootstrap'
import CalcInput from './CalcInput'
import CalcButtonList from './CalcButtonList'

class Calculator extends Component {
  constructor (props) {
    super(props)

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleInputText = this.handleInputText.bind(this)

    this.state = {
      expression: '',
      answer: ''
    }
  }

  handleButtonClick (e) {
    this.setState((prevState) => {
      prevState.expression += e
    })
  }

  handleInputText (e) {
    this.setState((prevState) => {
      prevState.expression += e
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
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Calculator
