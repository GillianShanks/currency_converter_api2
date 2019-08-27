import Vue from 'vue'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      rates: null,
      base: null,
      fromTo: 'from',
      selectedRate1: "",
      selectedRate2: "",
      input: 0,
    },
    computed: {
      output: function(){
        if (this.selectedRate1===1){
          if (this.fromTo==='from') {
            return (this.input * this.selectedRate2).toFixed(2);
          } else {
            return (this.input / this.selectedRate2).toFixed(2);
          }
        } else {
          if (this.fromTo === 'from') {
            const toEuro = (this.input / this.selectedRate1).toFixed(2);
            return (toEuro * this.selectedRate2).toFixed(2);
          } else {
            const fromEuro = (this.input * this.selectedRate1).toFixed(2);
            return (fromEuro * this.selectedRate2).toFixed(2);
          }
        }

      },
      selectedCurrency: function(){
        return Object.keys(this.rates).find(key => this.rates[key] === this.selectedRate2)
      },
      toFrom: function(){
        if (this.fromTo==='from'){
          return 'to';
        } else {
          return 'from';
        }
      }
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
          this.base=data.base;
        });
      },

    }
  });
})
