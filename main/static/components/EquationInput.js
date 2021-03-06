Vue.component('equation-input',{
  props:{
    'eqid':{
      type: Number
    }
  },
  methods:{
    
  },
  template:`
  <div class='equation-input' :data-id='eqid'>
    <div>{{eqid}}</div>
    <input class='input is-small'>
    <button class="button del-btn"><i class="material-icons">close</i></button>
  </div>
  `
})