<template>
  <b-table :data="investments">
    <template slot-scope="props">
      <b-table-column field="type" label="TYPE">{{ props.row.type }}</b-table-column>
      <b-table-column field="interest_type" label="INTEREST TYPE">{{ props.row.interest_type }}</b-table-column>
      <b-table-column field="percentage" label="% contribution" numeric>{{ props.row.percentage }}</b-table-column>
      <b-table-column field="type">
        <button @click="edit(props.row)">Edit</button>
      </b-table-column>
      <b-table-column field="type">
        <button @click="remove(props.row)">Delete</button>
      </b-table-column>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p><b-icon icon="emoticon-sad" size="is-large"></b-icon></p>
          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import AddInvestmentModal from '@/components/AddInvestmentModal'

export default {
  name: 'InvestmentsTable',
  props: ['investments', 'usePercent'],
  methods: {
    edit (row) {
      this.$modal.open({
        parent: this,
        component: AddInvestmentModal,
        props: {
          usePercent: this.usePercent,
          investment: row,
          investments: this.investments,
        },
        hasModalCard: true
      })
    },
    remove (row) {
      console.log('Clicked delete')
      const index = this.investments.indexOf(row)
      this.$emit('remove-investment', index)
    }
  }
}
</script>
