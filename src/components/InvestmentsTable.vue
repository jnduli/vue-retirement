<template>
  <b-table :data="investments" narrowed bordered>
    <template slot-scope="props">
      <b-table-column field="type" label="TYPE">{{ props.row.type }}</b-table-column>
      <b-table-column field="interest_type" label="INTEREST TYPE">{{ props.row.interest_type }} @ {{ props.row.interest }}% / yr</b-table-column>
      <b-table-column field="percentage" label="% of income">{{ props.row.contribution.percent }}%</b-table-column>

      <b-table-column field="contribution" label="Ksh contribution">Ksh {{ props.row.contribution.currency }}</b-table-column>
      <b-table-column custom-key="Edit">
        <button @click="edit(props.row)">Edit</button>
      </b-table-column>
      <b-table-column custom-key="Delete">
        <button @click="remove(props.row)">Delete</button>
      </b-table-column>
    </template>

    <template slot="footer">
      <div class="has-text-right">
        Total Investments: {{ this.investments.length }}
      </div>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p><b-icon icon="emoticon-sad" size="is-large"></b-icon></p>
          <p>No investments added yet.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import AddInvestmentModal from '@/components/AddInvestmentModal'

export default {
  name: 'InvestmentsTable',
  props: ['investments', 'salary'],
  methods: {
    edit (row) {
      this.$modal.open({
        parent: this,
        component: AddInvestmentModal,
        props: {
          investment: row,
          investments: this.investments,
          salary: this.salary
        },
        hasModalCard: true
      })
    },
    remove (row) {
      const index = this.investments.indexOf(row)
      this.$emit('remove-investment', index)
    }
  }
}
</script>
