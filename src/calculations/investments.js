function getMonthlyInvestments (investments, salary) {
  return investments.map((invest) => {
    const monthly = {
      invest: (invest.percentage * salary) / 100,
      interest: (invest.interest / 1200),
      principal: [0],
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
function considerDeath (death, retirementExpenses, start) {
  let months = death * 12
  for (var i = 0; i < start.length; i++) {
    let requiredPrincipal = months * retirementExpenses
    if (start[i] > requiredPrincipal) {
      return start.slice(0, i + 1)
    }
    months = months - 1
  }
  return start
}

export function calculateInvestmentPeriods (
  investments, salary, expenses, retirementExpenses, usePercent = true, death = Infinity
) {
  if (investments.length <= 0) {
    return {
      passed: false,
      message: 'There are no investments'
    }
  }

  if (!usePercent) {
    retirementExpenses = parseInt(retirementExpenses) / salary * 100
    expenses = parseInt(expenses) / salary * 100
    investments = investments.map(obj => {
      obj.percentage = (obj.percentage / salary) * 100
      return obj
    })
  }

  const retirementReached = retirementExpenses * salary / 100
  // check that percentages add up to at most 100
  const investTotal = investments.reduce((acc, current) =>
    acc + parseInt(current.percentage, 0), 0)
  const total = parseInt(expenses) + investTotal
  if (investTotal <= 0.5) {
    return {
      passed: false,
      message: 'Investment is insignificant'
    }
  }

  if (total > 100) {
    return {
      passed: false,
      message: 'Total amount is greater than income'
    }
  }
  if (total < 100) {
    // add an investment at 0% interest rate
    investments.push({
      type: 'savings',
      interest: 0,
      distribution: '',
      percentage: 100 - total
    })
  }
  // this.investments is an array of investments made per month at a particular percentage
  // create array on monthlyinvestments, monthlyinterest and monthly principals
  let monthlyInvestments = getMonthlyInvestments(investments.slice(), salary)
  let profit = 0
  while (profit <= retirementReached) {
    monthlyInvestments = monthlyInvestments.map(individualInvestCalculations)
    // calculate profits
    profit = monthlyInvestments.reduce((acc, current) =>
      acc + current.profit[current.profit.length - 1], 0)
  }
  // lineData should be sum of investments per month
  const principals = monthlyInvestments.map(x => x.principal)

  let start = principals[0]
  for (let i = 1; i < principals.length - 1; i += 1) {
    start = start.map((num, index) => num + principals[i][index])
  }

  if (death > 0 && death < Infinity) {
    start = considerDeath(death, retirementReached, start)
  }

  return {
    passed: true,
    data: start
  }
}
