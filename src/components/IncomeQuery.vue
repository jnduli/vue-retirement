<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <button>Go To Advanced</button>
      </header>
      <div class="card-content">
      <b-field class="column" label="How much do you earn per month?">
        <b-input v-model="income" type="number" placeholder="0.00" required></b-input>
        <p class="control"><span class="button is-static">Ksh</span></p>
      </b-field>

      <b-field class="column" label="How much do you spend per month?">
        <b-input v-model="expenses" type="number" placeholder="0.00" required></b-input>
        <p class="control"><span class="button is-static">Ksh</span></p>
      </b-field>
        <router-link class="button" to="/invest">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
</script>
