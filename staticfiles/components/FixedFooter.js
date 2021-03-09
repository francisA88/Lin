/*function showBottomheet(){
  document.querySelector('.bottom-sheet').classList.remove('hidden');
}*/
Vue.component('fixed-footer',{
  props:{
    'resfunc':{
      type: Function
    }
  },
  methods:{
    showBottomSheet: ()=>{showBottomSheet()},
    addField: ()=>{vm.eqncount++},
    removeField: ()=>{
      if(vm.eqncount >2) vm.eqncount--;}
  },
  template: `
    <footer class="fixed-footer">
      <div class="container">
        <div class="">
          <a @click='showBottomSheet()'><span class='green-text' style='font-size:30px'> = </span></a>
          </div>
        <div class="teal-text"><a @click='addField()'><i class="material-icons">add_circle_outlined</i></a></div>
        <div class=""><a @click='removeField()'><i class="material-icons red-text">remove_circle_outlined</i></a></div>
      </div>
    </footer>
  `
})