export function organizeCIMonthlyInvestments (investments, salary) {
  return investments.map((invest) => {
    const monthly = {
      invest: (invest.percentage * salary) / 100,
      interest: (invest.interest / 1200),
      principal: [Number(invest.starting_amount)],
      interest_type: invest.interest_type,
      type: invest.type,
      profit: [0]
    }
    return monthly
  })
}

function individualInvestCalculations (x) {
  const principal = x.principal[x.principal.length - 1]
  const newPrincipal = principal + (principal * x.interest)
  x.principal.push(newPrincipal + x.invest)
  x.profit.push(newPrincipal - principal)
  return x
}

export function addCIMonthlyInvestments (investments) {
  return investments.map(individualInvestCalculations)
}

export function getCIMonthlyProfit (investments) {
  return investments.reduce((acc, cur) => acc + cur.profit.slice(-1).pop(), 0)
}
