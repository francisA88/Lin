const eqnIds = [1, 2]
isEmpty = (s)=>!Boolean(s.split(" ").join(''))

//initializeRemoveButtons();
var vm = new Vue({
  el: '#body',
  data: function() {
    return {
      eqncount: 2,
      eqnids: new Array(...eqnIds),
      results: {
      },
      error: ""
    }
  },
  methods: {
    wipe: function() {
      this.eqncount = 0;
      setTimeout(()=> {
        this.eqncount += 2
      }, 90)
    }
  }
});
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
//csrftoken required by Django
var csrftoken = getCookie('csrftoken');

function getEquations(){
  let eqStrings = [];
  document.querySelectorAll(".equation-input .input").forEach(el=>{
    eqStrings.push(el.value);
  });
  return eqStrings;
}

function showBottomSheet() {
  fetch(`/api/results`,{
    method: 'POST',
    credentials: 'same-origin',
    headers:{
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({'equations':getEquations()})
  }).then((data)=>{
    return data.json()
  }).then((res)=>{
    //vm.results = res['solution'];
    vm.error = res.error;
    vars = res.vars
    results = {}
    if (isEmpty(vm.error)){
      for (i=0; i<res.solution.length; i++){
        results[vars[i]] = res.solution[i]
      }
    }
    vm.results = results
    document.querySelector('.bottom-sheet').classList.remove('hidden');
  })
}
function initializeRemoveButtons() {
  eqnInputs = document.querySelectorAll('.equation-input')
  eqnInputs.forEach(function(el) {
    el.querySelector('.button').onclick = ()=> {
      console.log("Clicked")
      console.log(document.querySelectorAll('.equation-input').length)
      if (document.querySelectorAll('.equation-input').length <= 2) {
        console.log("Should stop")
        return;
      }
      document.querySelector("#equations-block").removeChild(el);
      //console.log(vm.eqncount)
    };
  });
}
document.addEventListener('DOMContentLoaded', (e)=> {
  initializeRemoveButtons()});