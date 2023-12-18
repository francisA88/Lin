Vue.component('equation-input',{
  props:{
    'eqid':{
      type: Number
    }
  },
  methods:{
    removeField: function(e){
      eblock = document.querySelector('#equations-block');
      if (eblock.querySelectorAll('.equation-input').length>2){
        eblock.removeChild(e.currentTarget.parentElement);
      }
    }
  },
  template:`
  <div class='equation-input' :data-id='eqid'>
    <div>{{eqid}}</div>
    <input class='input is-small'>
    <button class="button del-btn" @click="removeField"><i class="material-icons">close</i></button>
  </div>
  `
});