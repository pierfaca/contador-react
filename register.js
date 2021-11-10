/** Esta es la que mas se USA */
if("serviceWorker" in navigator) {
  //  console.log("si existe");
   navigator.serviceWorker.register("./sw.js");
}


/** Otra forma de cosultar si tiene serviceWorker el navegador */
/*
if(navigator.serviceWorker) {
    console.log("si existe");
}
*/