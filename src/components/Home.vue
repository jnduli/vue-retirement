<template>
  <section class="section">
    <div class="container">
      <h1 class="title">STAAFU</h1>
      <div/>
      <h2 class="subtitle">
      This is a retirement app that will help you check out on how your
      investments affect your future (incase nothing goes wrong). It works by
      getting the list of investments you intend to put your money in (you
      provide various information like yearly interest expected, whether it's
      siimple or compound interest and how much you expect to spend once you
      retire), and given the various investments plus how you spend your money,
      it gives you an approximate time period for you to retire.
      </h2>
      <router-link id='retirement-button' class="button" to="/income">Go to App</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>
