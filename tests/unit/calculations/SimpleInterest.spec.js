import { organizeSIMonthlyInvestments, getSIAccumulatedAmount, getSIMonthlyProfit } from '@/calculations/SimpleInterest.js'

describe('SimpleInterest Calculations', () => {
  it('organizes SI interest to monthly investments', () => {
    const investments = [
      {
        type: 'random',
        interest_type: 'simple',
        interest: 10.00,
        distribution: 'constant',
        percentage: 10
      }, {
        type: 'randomThing',
        interest_type: 'simple',
        interest: 15.00,
        distribution: 'constant',
        percentage: 20
      }
    ]

    const salary = 10000
    const result = [
      {
        invest: (10 * salary) / 100,
        interest: 10 / 1200,
        principal: [0],
        accumulatedInterest: 0,
        profit: [0]
      }, {
        invest: (20 * salary) / 100,
        interest: 15 / 1200,
        principal: [0],
        accumulatedInterest: 0,
        profit: [0]
      }
    ]
    const computedResult = organizeSIMonthlyInvestments(investments, salary)
    expect(computedResult).toEqual(result)
  })

  it('get accumulated amount', () => {
    const salary = 10000
    const investments = [
      {
        invest: (10 * salary) / 100,
        interest: 10 / 1200,
        principal: [0],
        accumulatedInterest: 0,
        profit: [0]
      }, {
        invest: (20 * salary) / 100,
        interest: 15 / 1200,
        principal: [0],
        accumulatedInterest: 0,
        profit: [0]
      }
    ]
    const accumulatedAmount = getSIAccumulatedAmount(investments, 3)
    expect(accumulatedAmount).toEqual(9200)
  })
})
