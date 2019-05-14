# Introduction
Vue retirement is an application made to calculate how long some
one has to retire when they provide some parameters. The
parameters required are:

- Expected remaining life time
- Salary earned (after taxes)
- Average monthly expenditure
- How much one expects to spend once they retire

The various investments and savings once intends to start are then
input. The parameters for each investment include:

- The type of investment
- The annual interest the investment should earn
- The distribution expected of the investment (currently it is
  assumed to be constant, but others will be included later on
  like gaussian)
- The amount invested per month

The system then calculates how long it will take to get into
retirement. Retirement occurs when the interest earned per month
from the investments is greater than the expenditure per month (if
one has not input the expected life time) or when the sum of
interest and savings is greater than the expected expenditure over
one's life time (when one inputs the expected life time).

# Live Example
[live example](https://jnduli.co.ke/retirement/)

## Running tests
`npm run test:unit`
