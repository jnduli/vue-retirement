import {organizeCIMonthlyInvestments, addCIMonthlyInvestments} from '@/calculations/CompoundInterest.js'

describe('CompoundInterest Calculations', () => {
  it('organizes CI interest to monthly investments', () => {
    const investments = [
      {
        type: 'random',
        interest_type: 'compound',
        interest: 10.00,
        distribution: 'constant',
        percentage: 10,
        starting_amount: 0
      }, {
        type: 'randomThing',
        interest_type: 'compound',
        interest: 15.00,
        distribution: 'constant',
        percentage: 20,
        starting_amount: 1000
      }
    ]

    const salary = 10000
    const result = [
      {
        invest: (10.0 * salary) / 100,
        interest: 10.0 / 1200,
        principal: [0],
        interest_type: 'compound',
        type: 'random',
        profit: [0]
      }, {
        invest: (20 * salary) / 100,
        interest: 15 / 1200,
        principal: [1000],
        profit: [0],
        interest_type: 'compound',
        type: 'randomThing',
        profit: [0]
      }
    ]
    const computedResult = organizeCIMonthlyInvestments(investments, salary)
    expect(computedResult).toEqual(result)
  })

  it('get monthly investment from CI', () => {
    const salary = 10000
    const investments = [
      {
        invest: (10.0 * salary) / 100,
        interest: 12.0 / 1200,
        principal: [0],
        profit: [0]
      }, {
        invest: (20 * salary) / 100,
        interest: 15 / 1200,
        principal: [0],
        profit: [0]
      }
    ]

    const results = addCIMonthlyInvestments(addCIMonthlyInvestments(investments))
    const expected = [
      {
        invest: (10.0 * salary) / 100,
        interest: 12.0 / 1200,
        principal: [0, 1000, 2010],
        profit: [0, 0, 10]
      }, {
        invest: (20 * salary) / 100,
        interest: 15 / 1200,
        principal: [0, 2000, 4025],
        profit: [0, 0, 25]
      }
    ]
    expect(expected).toEqual(results)
  })
})
