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
export default {
  name: 'InvestmentsTable',
  props: ['investments'],
  data () {
    return {
      columns: [
        {
          field: 'type',
          label: 'TYPE'
        },
        {
          field: 'interest_type',
          label: 'INTEREST TYPE',
          numeric: true
        },
        {
          field: 'percentage',
          label: 'percentage contribution',
          numeric: true
        }
      ]
    }
  },
  methods: {
    edit (row) {
      console.log('edit')
      console.log(row)
    },
    remove (row) {
      console.log('delete')
      console.log(row)
    }
  }
}
</script>
