<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Add Investment/Savings</p>
        <button>Go To Advanced</button>
      </header>
    </div>
    <div class="card-content">
      <button>Autogenerate</button>
      <button v-on:click="isAddInvestmentModalActive = true">Manually Add</button>
      <b-modal :active.sync="isAddInvestmentModalActive" has-modal-card>
          <add-investment-modal v-on:addInvestment="addInvestment" :salary="salary" :limit="limit"></add-investment-modal>
      </b-modal>
      <investments-table
        :salary="salary"
        :investments="investments"
        v-on:remove-investment='removeInvestment' />
        <router-link class="button" to="/results">Calculate</router-link>
    </div>
  </div>
</template>

<script>
import InvestmentForm from '@/components/InvestmentForm'
import AddInvestmentModal from '@/components/AddInvestmentModal'
import InvestmentsTable from '@/components/InvestmentsTable'

export default {
  name: 'InvestmentQuery',
  components: {
    InvestmentForm,
    AddInvestmentModal,
    InvestmentsTable
  },
  data () {
    return {
      isAddInvestmentModalActive: false,
      salary: 10000,
      limit: 10000,
      investments: []
    }
  },
  methods: {
    addInvestment (investment) {
      this.investments.push(investment)
    },
    removeInvestment (index) {
      this.investments.splice(index, 1)
    }
  }
}
</script>
