import { organizeCIMonthlyInvestments, addCIMonthlyInvestments, getCIMonthlyProfit } from './CompoundInterest'
import { organizeSIMonthlyInvestments, getSIAccumulatedAmount, getSIMonthlyProfit } from './SimpleInterest'

export const SIMPLE_INTEREST = 'simple'
export const COMPOUND_INTEREST = 'compound'
export const NO_INTEREST = 'none'

export const INVESTMENT_TYPE = [SIMPLE_INTEREST, COMPOUND_INTEREST, NO_INTEREST]

function splitInvestments (investments) {
  const simpleInvestments = investments.filter(invest => invest.interest_type === SIMPLE_INTEREST)
  const compoundInvestments = investments.filter(invest => invest.interest_type === COMPOUND_INTEREST)
  const zeroInvestments = investments.filter(invest => invest.interest_type === NO_INTEREST)
  return [simpleInvestments, compoundInvestments, zeroInvestments]
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

function getInvestmentParameters (investments, salary, expenses, retirementExpenses) {
  investments = investments.map(obj => {
    obj.percentage = obj.contribution.percent
    return obj
  })
  return [retirementExpenses, expenses, investments]
}

export function calculateInvestmentPeriods (
  investments, salary, expenses, retirementExpenses, death = Infinity
) {
  if (investments.length <= 0) {
    return {
      passed: false,
      message: 'There are no investments'
    }
  }

  [retirementExpenses, expenses, investments] = getInvestmentParameters(investments, salary, expenses, retirementExpenses)

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
      interest_type: NO_INTEREST,
      interest: 0,
      distribution: '',
      percentage: 100 - total
    })
  }
  let [si, ci, ni] = splitInvestments(investments)
  // do this because logic for no_interest has not been implemented
  // ci.push(ni)

  console.log(ci)
  si = organizeSIMonthlyInvestments(si.slice(), salary)

  // this.investments is an array of investments made per month at a particular percentage
  // create array on monthlyinvestments, monthlyinterest and monthly principals
  let ciMonthlyInvestments = organizeCIMonthlyInvestments(ci.slice(), salary)
  let profit = 0
  let month = 0
  while (profit <= retirementReached) {
    ciMonthlyInvestments = addCIMonthlyInvestments(ciMonthlyInvestments)
    profit = getCIMonthlyProfit(ciMonthlyInvestments) + getSIMonthlyProfit(si, month)
    month = month + 1
  }
  // month = month - 1

  // lineData should be sum of investments per month
  const ciPrincipals = ciMonthlyInvestments.map((x) => x.principal)// + getSIAccumulatedAmount(si, month))

  let start = ciPrincipals[0] ? ciPrincipals[0] : 0
  for (let i = 1; i < ciPrincipals.length - 1; i += 1) {
    start = start.map((num, index) => num + ciPrincipals[i][index])
  }

  if (start == 0) {
    start = []
    for (let i = 0; i < month; i+=1) {
      start.push(getSIAccumulatedAmount(si, i))
    }
  } else {
    start = start.map((num, month) => num + getSIAccumulatedAmount(si, month))
  }


  if (death > 0 && death < Infinity) {
    start = considerDeath(death, retirementReached, start)
  }

  return {
    passed: true,
    data: start,
    extras: [...ciMonthlyInvestments, ...si]
  }
}
