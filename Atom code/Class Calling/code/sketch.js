class con{
  don(text){
    print(text)
  }
}

let conAr = []

function setup(){
  conAr.push(new con())
  conAr.push(new con())
  classCall("conAr", "don", "owo")
}


function classCall(arrayName, fnName, extras){
  for(let i = 0; i < arrayName.length; i++){
    arrayName[i].fnName(extras)
  }
}
