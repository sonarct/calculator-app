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
  let e = expr
  let pattern = [
    '(\\d+\\.?\\d*)',
    '',
    '(\\d+\\.?\\d*)'
  ]
  let flag = 'g'
  let ops = [
    {sign: '\\/', fn: div},
    {sign: '\\*', fn: mul},
    {sign: '\\-', fn: sub},
    {sign: '\\+', fn: sum}]
  let functions = []

  for (let o in ops) {
    pattern[1] = ops[o].sign
    let fn = ops[o].fn
    let regexp = new RegExp(pattern.join(''), flag)

    console.log(regexp)

    let match

    while ((match = regexp.exec(e)) !== null) {
      let x = fn(match[1], match[2])
      console.log(match)
      console.log(x)
      console.log(e)
      console.log(match.index)
      let i = match.index
      let l = match[0].length
      let b = e.slice(0, i)
      let a = e.slice(i + l)
      console.log('b ', b)
      console.log('a ', a)
      e = [b, x, a].join('')
    }
  }
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
  if (brs[1] === -1 && !brs[0]) {
    brs[0] = -1
    brs[1] = expr.length
  }
  console.log(brs[0], brs[1])

  let part = expr.slice(brs[0] + 1, brs[1])
  console.log(part)
  if (checkExpression(part)) {
    parseExpression(part)
  } else {
    console.log('ne valid')
  }
}

function checkExpression (expr) {
  let isValid = (/^-?\d+\.?\d*([*/+-]\d+\.?\d*)*$/g.test(expr))
  console.log(expr)
  console.log('valid ', isValid)
  return isValid
}

function sum (a, b) {
  return parseFloat(a) + parseFloat(b)
}

function sub (a, b) {
  return parseFloat(a) - parseFloat(b)
}

function mul (a, b) {
  return parseFloat(a) * parseFloat(b)
}

function div (a, b) {
  return parseFloat(a) / parseFloat(b)
}
