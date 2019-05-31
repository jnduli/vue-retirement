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

          <unit-conversion-input
            label="Contribution"
            tooltip="How much do you think you'll be able to provide per month to this investment? It can be a percentage of your salary or an actual value"
            :fractional-money="contribution"
            :main-money="salary"
            ></unit-conversion-input>

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
            <button v-else id="edit" class="button is-primary" type="button" @click="editInvestment">Edit</button>
            <button id="cancel" class="button" type="button" @click="$parent.close()">Cancel</button>
        </footer>
  </div>
</form>
</template>

<script>
import UnitConversionInput from '@/components/UnitConversionInput'

export default {
  name: 'AddInvestmentModal',
  components: {
    UnitConversionInput
  },
  props: ['investment', 'investments', 'salary'],
  data () {
    return {
      name: '',
      contribution: {
        percent: 0,
        currency: 0,
        use_percent: false
      },
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
      this.contribution = this.investment.contribution
      this.index = this.investments.indexOf(this.investment)
      this.starting_amount = this.investment.starting_amount
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
        contribution: this.contribution,
        starting_amount: this.starting_amount
      }
      this.investments.splice(this.index, 1, investment)
      this.$parent.close()
    }
  }
}
</script>
