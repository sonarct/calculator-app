import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import InputExpression from './InputExpression'

class Calculator extends Component {
  render () {
    return (
      <div>
        <Grid>
          <Row>
            <Col>
              Calculator
              <InputExpression />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Calculator
