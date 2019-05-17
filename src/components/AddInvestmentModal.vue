<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
          <p class="modal-card-title">Investment Details</p>
      </header>
      <section class="modal-card-body">
          <b-field  label="Name">
              <b-input
                  type="text"
                  :value="name"
                  placeholder="Money Market Fund"
                  required>
              </b-input>
          </b-field>

          <b-field  label="Monthly Contribution">
            <b-input
              type="number"
              :value="contribution"
              placeholder="100000"
              required>
            </b-input>
          </b-field>

          <b-field  label="Type of Interest">
            <b-select>
              <option>Simple Interest</option>
              <option>Compound Interest</option>
            </b-select>
          </b-field>

          <b-field  label="Initial amount in investment">
            <b-input
              type="number"
              :value="starting_amount"
              placeholder="100000"
              required>
            </b-input>
          </b-field>
      </section>
      <footer class="modal-card-foot">
          <button class="button is-primary" type="button" @click="$parent.close()">Add</button>
          <button class="button" type="button" @click="$parent.close()">Cancel</button>
      </footer>
  </div>
</form>
</template>
