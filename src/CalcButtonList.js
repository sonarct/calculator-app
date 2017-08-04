import React, {Component} from 'react'
import CalcButton from './CalcButton'
import {Col} from 'react-bootstrap'

class CalcButtonList extends Component {
  render () {
    const values = [
      [1, 2, 3, '+'],
      [4, 5, 6, '-'],
      [7, 8, 9, '*'],
      ['D', 0, '.', '/'],
      ['(', ')'],
      ['C', '=']
    ]

    let i = 0
    let j = 0

    let groups = values.map((numbers) => {
      const buttons = numbers.map((value) => {
        return (
          <CalcButton value={value} onClick={this.props.onClick} key={i++} />
        )
      })

      return (
        <div key={j++} className='calc-btn-group' >
          {buttons}
        </div>
      )
    })

    return (
      <div>
        <Col xs={8} md={8}>
          {groups[0]}
          {groups[1]}
          {groups[2]}
          {groups[3]}
        </Col>
        <Col xs={4} md={4} className='calc-operations-block'>
          {groups[4]}
          {groups[5]}
        </Col>
      </ div>
    )
  }
}

export default CalcButtonList
