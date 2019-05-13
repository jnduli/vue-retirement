export function organizeSIMonthlyInvestments (investments, salary) {
  return investments.map((invest) => {
    const monthly = {
      invest: (invest.percentage * salary) / 100,
      interest: (invest.interest / 1200),
      principal: [0],
      accumulatedInterest: 0,
      profit: [0]
    }
    return monthly
  })
}

function individualInvestCalculations (x, month) {
  const principal = month * x.invest
  const profit = x.interest * principal
  // create array of months ie. [1, 2, 3 ... month]
  const months = Array.from({length: month}, (val, index) => index + 1)
  const accumulatedInterest = months.reduce((acc, cur) => acc + (cur * x.invest * x.interest), 0)
  return {
    principal: principal,
    profit: profit,
    accumulatedInterest: accumulatedInterest
  }
}

export function getSIAccumulatedAmount (investments, month) {
  let si = investments.map(x => individualInvestCalculations(x, month))
  console.log(si)
  return si.reduce((acc, cur) => acc + cur.principal + cur.accumulatedInterest, 0)
}

export function getSIMonthlyProfit (investments, month) {
  const investM = investments.map((invest) =>
    individualInvestCalculations(invest, month)
  )
  const profit = investM.reduce((acc, cur) => acc + cur.profit, 0)
  return profit
}
