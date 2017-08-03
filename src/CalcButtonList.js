import React, {Component} from 'react'
import {ButtonGroup, Col} from 'react-bootstrap'
import CalcButton from './CalcButton'

class CalcButtonList extends Component {
  render () {
    const values = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['D', 0, 'C'],
      ['+', '-', '('],
      ['*', '/', ')'],
      ['=']
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
        <ButtonGroup key={j++} justified >
          {buttons}
        </ButtonGroup>
      )
    })

    return (
      <div>
        {groups[0]}
        {groups[1]}
        {groups[2]}
        {groups[3]}
        {groups[4]}
        {groups[5]}
        {groups[6]}
      </ div>
    )
  }
}

export default CalcButtonList
