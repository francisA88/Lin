const eqnIds = [1, 2]
isEmpty = (s)=>!Boolean(s.split(" ").join(''))

//initializeRemoveButtons();
const vm = new Vue({
  el: '#body',
  data: function() {
    return {
      eqncount: 2,
      eqnids: new Array(...eqnIds),
      results: {
      },
      error: "",
    }
  },
  methods: {
    wipe: function() {
      this.eqncount = 0;
      setTimeout(()=> {
        this.eqncount += 2
      }, 90)
    },
    hideHelp: function(){
      document.querySelector('#help-panel-bg').classList.add("hidden");
    },
    showHelp: function(){
      document.querySelector('#help-panel-bg').classList.remove('hidden');
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
  }).then((data)=>data.json()).catch(err=>{
    console.log("Error caught?")
    vm.error = 'Unknown Error. Please check that the equations are specified correctly';
    document.querySelector('.bottom-sheet').classList.remove('hidden');
  }).then((res)=>{
    //vm.results = res['solution'];
    try{
      vm.error = res.error;
    }
    catch(e){ return }
    vars = res.vars
    results = {}
    if (isEmpty(vm.error)){
      for (i=0; i<res.solution.length; i++){
        results[vars[i]] = res.solution[i];
      }
    }
    vm.results = results;
    document.querySelector('.bottom-sheet').classList.remove('hidden');
  });
}

