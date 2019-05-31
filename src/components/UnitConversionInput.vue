<template>
  <b-field>
    <template slot="label">
      {{ label }}
      <b-tooltip v-if="tooltip" type="is-dark" size="is-small" class="button is-outlined" :label="tooltip" multilined>
        ?
      </b-tooltip>
    </template>
    <b-input v-if="fractionalMoney.use_percent" v-model="fractionalMoney.percent" type="number" step="any"></b-input>
    <b-input v-else v-model="fractionalMoney.currency" type="number" step="any"></b-input>
    <p class="control">
    <button class="button is-primary" @click='changeMoneyUnit'>{{ label_money_unit }}</button>
    </p>
  </b-field>
</template>

<script>
export default {
  name: 'UnitConversionInput',
  props: ['label', 'tooltip', 'fractionalMoney', 'mainMoney'],
  computed: {
    label_money_unit: function () {
      if (this.fractionalMoney.use_percent) {
        return '%'
      }
      return 'Ksh'
    }
  },
  watch: {
    fractionalMoney: {
      handler: function (newVal, oldVal) {
        if (newVal.use_percent === oldVal.use_percent) {
          if (newVal.use_percent) {
            this.fractionalMoney.currency = newVal.percent * this.mainMoney / 100
          } else {
            this.fractionalMoney.percent = newVal.currency * 100 / this.mainMoney
          }
        }
      },
      deep: true
    }
  },
  methods: {
    changeMoneyUnit () {
      // if it was showing use_percent, change value to correct number
      this.fractionalMoney.use_percent = !this.fractionalMoney.use_percent
    }
  }
}
</script>
