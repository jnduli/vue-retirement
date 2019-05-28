<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
          <p class="modal-card-title">Investment Details</p>
      </header>
        <section class="modal-card-body">
          <b-field  label="Name">
            <b-input v-model="name" type="text" placeholder="Money Market Fund" required></b-input>
          </b-field>

          <b-field  label="Annual Interest in %">
            <b-input v-model="interest" type="number" placeholder="10" required></b-input>
          </b-field>

          <b-field  :label="label_contributions">
            <b-input v-model="contribution" type="number" placeholder="10" required></b-input>
          </b-field>

          <b-field  label="Type of Interest">
            <b-select v-model="interest_type" required>
              <option value="simple">Simple Interest</option>
              <option value="compound">Compound Interest</option>
              <option value="none">No Interest</option>
            </b-select>
          </b-field>

          <b-field  label="Initial amount in investment">
            <b-input v-model="starting_amount" type="number" placeholder="100000" required></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
            <button id="add" v-if="investment == null" class="button is-primary" type="button" @click="addInvestment">Add</button>
            <button v-else class="button is-primary" type="button" @click="editInvestment">Edit</button>
            <button class="button" type="button" @click="$parent.close()">Cancel</button>
        </footer>
  </div>
</form>
</template>

<script>
export default {
  name: 'AddInvestmentModal',
  props: ['usePercent', 'investment', 'investments'],
  data () {
    return {
      name: '',
      contribution: 0,
      interest_type: 'simple',
      starting_amount: 0,
      interest: 0,
      index: 0
    }
  },
  created: function () {
    if (this.investment != null) {
      this.name = this.investment.type
      this.interest_type = this.investment.interest_type
      this.interest = this.investment.interest
      this.contribution = this.investment.percentage
      this.index = this.investments.indexOf(this.investment)
      this.starting_amount = this.investment.starting_amount
    }
  },
  computed: {
    label_contributions: function () {
      if (this.usePercent) {
        return 'Contributions as % of income'
      }
      return 'Contributions in Ksh'
    }
  },
  methods: {
    validateForm () {
      if (this.name && this.contribution && (this.starting_amount >= 0)) {
        return true
      }
      this.$toast.open({
        message: 'Inputs are invalid: name  and starting amount have to be set and contribution > 0',
        type: 'is-danger'
      })
      return false
    },
    addInvestment () {
      if (!this.validateForm()) {
        return
      }
      const investment = {
        type: this.name,
        interest_type: this.interest_type,
        interest: this.interest,
        percentage: this.contribution,
        distribution: '',
        contribution: this.contribution,
        starting_amount: this.starting_amount
      }
      this.$emit('addInvestment', investment)
      this.$parent.close()
    },
    editInvestment () {
      if (!this.validateForm()) {
        return
      }
      const investment = {
        type: this.name,
        interest_type: this.interest_type,
        interest: this.interest,
        percentage: this.contribution,
        distribution: '',
        contribution: this.contribution,
        starting_amount: this.starting_amount
      }
      this.investments.splice(this.index, 1, investment)
      this.$parent.close()
    }
  }
}
</script>
