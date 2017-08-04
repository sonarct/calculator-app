export default function evaluate (expr) {
  if (!checkBrackets(expr)) {
    return 'Error. Problem with brackets'
  }

  let result = getExpression(expr)

  return result
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
    '(-?\\d+\\.?\\d*)']
  let ops = [
    {sign: '\\/', fn: div},
    {sign: '\\*', fn: mul}]

  for (let o in ops) {
    pattern[1] = ops[o].sign
    let fn = ops[o].fn
    let regexp = new RegExp(pattern.join(''))
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

      e = normalize(e)
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
    expr = normalize(expr)

    if (checkExpression(expr)) {
      let result = parseExpression(expr)
      return result
    } else {
      return 'Error. Expression is incorrect'
    }
  }

  let brs = findBrackets(expr)
  let brl = brs.left
  let brr = brs.right

  let part = expr.slice(brl + 1, brr)
  console.log(part)

  if (checkExpression(part)) {
    let result = parseExpression(part)
    console.log(expr, result)

    let left = expr.slice(0, brl)
    let right = expr.slice(brr + 1)
    let z = [left, result, right].join('')

    console.log('Step__________ ', z)
    let total = getExpression(z)
    return total
  } else {
    return 'Error. Expression is incorrect'
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

  return {left: l, right: r}
}

function checkExpression (expr) {
  return (/^-?\d+\.?\d*(([*/+-]|\/\-|\*\-)\d+\.?\d*)*$/g.test(expr))
}

function mul (a, b) {
  return parseFloat(a) * parseFloat(b)
}

function div (a, b) {
  return parseFloat(a) / parseFloat(b)
}

function normalize (e) {
  e = e.replace('--', '+')
  e = e.replace('+-', '-')
  e = e.replace('-+', '-')
  return e
}
