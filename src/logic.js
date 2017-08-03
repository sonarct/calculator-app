export default function calculate (expr) {
  if (!checkBrackets(expr)) {
    return {
      isValid: false,
      answer: 'problem with brackets'
    }
  }

  // Parse expression
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
  console.log(part)

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
