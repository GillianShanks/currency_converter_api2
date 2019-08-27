import Vue from 'vue'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      rates: null,
      selectedRate1: "",
      selectedRate2: "",
      input: 0,
    },
    computed: {
      output: function(){
        const toEuro = (this.input / this.selectedRate1).toFixed(2);
        return (toEuro * this.selectedRate2).toFixed(2);

      },
      selectedCurrency: function(){
        return Object.keys(this.rates).find(key => this.rates[key] === this.selectedRate2);
      },
    },
    mounted(){
      this.fetchRates();
    },
    methods:{
      fetchRates: function(){
        fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then(data => {
          this.rates=data.rates;
          this.rates["EUR"] = 1;
        });
      },

    }
  });
})
