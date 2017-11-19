function show(Id){
  let div = document.getElementById(Id);
  let pos = div.style.display;
  checkState(pos, div);
  }

function checkState(state, div) {
  if(state != "none") {
    return div.style.display ="none";
  }
    return div.style.display ="";
  }