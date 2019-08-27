import Vue from 'vue'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      rates: null,
      base: null,
      fromTo: 'from',
      toFrom: 'to',
      selectedRate: 0,
      input: 0,
    },
    computed: {
      output: function(){
        if (this.fromTo==='from') {
          return (this.input * this.selectedRate).toFixed(2);
        }

      },
      selectedCurrency: function(){
        return Object.keys(this.rates).find(key => this.rates[key] === this.selectedRate)
      },
      toFrom: function(){
        if (this.fromTo==='from'){
          this.toFrom = 'to';
        } else {
          this.toFrom = 'from';
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
      }
    }
  });
})
