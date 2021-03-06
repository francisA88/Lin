function closeBtmSheet(){
  document.querySelector(".bottom-sheet").classList.add('hidden')
}

Vue.component('bottom-sheet',{
  props:{
    res: {
      type: Object,
      default: (()=>{})(),
    },
    hidden:{
      type: Boolean,
      default: false
    },
    error:{
      type: String,
      default: ""
    }
  },
  methods:{
    closeBtmSheet: function(){
      closeBtmSheet()
      console.log("Err: ",this.error)
    },
    hasError: function(){
      return Boolean(this.error.split(" ").join(""));
    }
  },
  template:`
  <aside :class="['bottom-sheet', hidden?'hidden':'']">
    <div class="btm-toggle">
      <button class="button is-primary is-filled" @click='closeBtmSheet()'><i class="material-icons">menu</i></button>
    </div>
    <div class="divider"></div>
    <div class="container">
      <div class='block'>
        <h5 class='green-text'>Results</h5>
        <div class='divider'></div>
      </div>
    </div>
    <div class="results">
      <ul class='resul'>
        <li v-for='(val, v) in res' >{{v}} = {{val}}</li>
      </ul>
    </div>
    <div class="block" v-if='hasError()'>
      <span class='red-text'>Error: {{error}}</span>
    </div>
  </aside>
  `
});
