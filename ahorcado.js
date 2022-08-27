// Array de palabras
const palabras = ["argentina", "buenosaires","brasil","brasilia","alemania","berlin","afganistan","kabul","australia","canberra",
"belgica", "bruselas","bolivia","sucre","canada","ottawa","chile","santiago","china","pekin","cuba","habana","ecueador","quito",
"españa","madrid","francia","paris","irlanda","dublin","jamaica","kington","japon","tokio","paraguay","asuncion","peru","lima",
"portugal","lisboa","rusia","moscu","italia","roma","suiza","berna","venezuela","caracas"];
// Palabra a averiguar
let palabra = "";
// Nº aleatorio
let random;
// Palabra escondida
let guiones = [];
// Elemento html de la palabra
let vacio = document.getElementById("palabra");
// Contador de intentos
let cont = 6;
// Botones de letras
let boton = document.getElementsByClassName('letra');
// Boton de reset
const reinicio = document.getElementById("reset");


reinicio.addEventListener('click',function(){
  inicio();
});

generaPalabra();
generarGuiones(palabra.length);
generaABC("a","z");
document.getElementById("intentos").innerHTML=cont;


//////////////////////// DEFINICION DE FUNCIONES

// #1  Restablece o arranca el juego
function inicio() {
  palabra = "";
  guiones = [];
  generaPalabra();
  generarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
  document.getElementById("image0").className = "ocultar";
  document.getElementById("image1").className = "ocultar";
  document.getElementById("image2").className = "ocultar";
  document.getElementById("image3").className = "ocultar";
  document.getElementById("image4").className = "ocultar";
  document.getElementById("image5").className = "ocultar";
  document.getElementById("image6").className = "mostrar";
}

// #2 Elegir palabra al azar
function generaPalabra() {
  random = (Math.random() * 19).toFixed(0);
  palabra = palabras[random].toUpperCase();
}

// #3 Funcion para pintar los guiones de la palabra
function generarGuiones(num){
  for (let i = 0; i < num; i++) {
    guiones[i] = "_";
  }
  // Join toma todos los guiones del array de guiones[] y los une por un string vacio
  // se asigna al inner html de la variable vacio
  vacio.innerHTML = guiones.join("");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  let i = a.charCodeAt(0), j = z.charCodeAt(0);
  let letra = "";
  for(i ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();

    document.getElementById("abcdario").innerHTML += 
    "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
  }
}

// Chequear intento
function intento(letra) {
  // Desabilitamos el boton de la letra que se clickeo pasandole el parametro de etiqueta html "disabled"
  document.getElementById(letra).disabled = true;
  // Si la letra si existe en la palabra oculta indexOf devuelve algo diferente a -1 (la posicion en guiones[])
  if(palabra.indexOf(letra) != -1) {
    for(let i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) guiones[i] = letra;
    }
    vacio.innerHTML = guiones.join("");
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("image"+cont).className = "mostrar";
  }
  // Nos fijamos si se adivino la palabra con compruebaFin
  compruebaFin();
}

// compruebaFin evalua si se adivinó la palabra
function compruebaFin() {
  if( guiones.indexOf("_") == -1 ){
    for (let i = 0; i < boton.length; i++) {
      boton[i].disabled = true;
    }
    ganaste();
  }else if( cont == 0 ) {
    perdiste();
    for (let i = 0; i < boton.length; i++) {
      boton[i].disabled = true;
    }
    
  }
}
function ganaste() {
  document.getElementById("ganar").style.display="block";
}
function perdiste() {
  document.getElementById("perder").style.display="block";
}