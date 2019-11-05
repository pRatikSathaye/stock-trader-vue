<template>
  <div>
    <app-stock v-for="(stock, ind) in stocks" :stock="stock" :key="ind"></app-stock>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Stock from './Stock.vue';

  export default {
    computed: {
      ...mapGetters({
        stocks: 'stockPortfolio'
      })
    },
    components: {
      appStock: Stock
    }
  }
</script>