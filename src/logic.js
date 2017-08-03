export default function calculate (expr) {
  if (!checkBrackets(expr)) {
    return {
      isValid: false,
      answer: 'problem with brackets'
    }
  }

  let result = getExpression(expr)

  return {
    isValid: true,
    answer: result
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
  let flag = 'g'
  let pattern = [
    '(\\d+\\.?\\d*)',
    '',
    '(\\d+\\.?\\d*)']
  let ops = [
    {sign: '\\/', fn: div},
    {sign: '\\*', fn: mul}]

  e = e.replace('--', '+')
  e = e.replace('+-', '-')
  e = e.replace('-+', '-')

  for (let o in ops) {
    pattern[1] = ops[o].sign
    let fn = ops[o].fn
    let regexp = new RegExp(pattern.join(''), flag)
    let match

    while ((match = regexp.exec(e)) !== null) {
      let result = fn(match[1], match[2])
      console.log(match)
      console.log(e, ' = ', result)
      let i = match.index
      let l = match[0].length
      let left = e.slice(0, i)
      let right = e.slice(i + l)
      e = [left, result, right].join('')
    }
  }

  let regexp = /(-?\d+\.?\d*)/g
  let match = e.match(regexp)
  console.log(match)
  let numbers = match.slice()
  let total = numbers.reduce((sum, val) => {
    return parseFloat(sum) + parseFloat(val)
  })
  console.log(total)

  return total
}

function getExpression (expr) {
  if (!(/[()]/g.test(expr))) {
    let result = parseExpression(expr)
    return result
  }

  let brs = findBrackets(expr)
  let brl = brs[0]
  let brr = brs[1]

  let part = expr.slice(brl + 1, brr)
  console.log(part)

  if (checkExpression(part)) {
    let result = parseExpression(part)
    console.log(expr, result)

    let left = expr.slice(0, brl)
    let right = expr.slice(brr + 1)
    let z = [left, result, right].join('')

    let total = getExpression(z)
    console.log(z)
    return total
  } else {
    return {
      isValid: false,
      answer: 'Problem with evaluating'
    }
  }
}

function findBrackets (expr) {
  let l
  let r

  r = expr.indexOf(')')
  for (let i = r; i >= 0; i--) {
    if (expr[i] === '(') {
      l = i
      break
    }
  }

  if (r === -1 && !l) {
    l = -1
    r = expr.length
  }

  return [l, r]
}

function checkExpression (expr) {
  let isValid = (/^-?\d+\.?\d*([*/+-]\d+\.?\d*)*$/g.test(expr))
  return isValid
}

function mul (a, b) {
  return parseFloat(a) * parseFloat(b)
}

function div (a, b) {
  return parseFloat(a) / parseFloat(b)
}
