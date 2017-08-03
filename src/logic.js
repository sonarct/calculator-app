export default function calculate (expr) {
  if (!checkBrackets(expr)) {
    return {
      isValid: false,
      answer: 'problem with brackets'
    }
  }

  getExpression(expr)

  return {
    isValid: true,
    answer: 'ok'
  }
}

function checkBrackets (expr) {
  let br = 0

  for (let i in expr) {
    let symbol = expr[i]

    if (symbol === '(') {
      br++
    } else if (symbol === ')') {
      br--
    }

    if (br < 0) {
      return false
    }
  }

  if (br > 0) {
    return false
  } else {
    return true
  }
}

function parseExpression (expr) {
  console.log(expr)
}

function getExpression (expr) {
  let brs = []
  brs[1] = expr.indexOf(')')
  for (let i = brs[1]; i >= 0; i--) {
    if (expr[i] === '(') {
      brs[0] = i
      break
    }
  }
  console.log(brs[0], brs[1])

  let part = expr.slice(brs[0] + 1, brs[1])
  if (checkExpression(part)) {
    parseExpression(part)
  } else {
    console.log('ne valid')
  }
}

function checkExpression (expr) {
  let isValid = (/^-?\d+([*/+-]\d+)*$/g.test(expr))
  console.log('valid ', isValid)
  return isValid
}
