class Inmueble{
    constructor(direccion, barrio, valor, expensas, ambientes){
        this.direccion = direccion;
        this.barrio = barrio;
        this.valor = parseFloat(valor);
        this.expensas = parseFloat(expensas);
        this.ambientes = parseInt(ambientes);
    }
}
const arrayI = [];
arrayI.push (new Inmueble("25 de mayo 192", "Centro", 18000, 2500, 1));
arrayI.push (new Inmueble("24 de septiembre 1864", "General Paz", 50000, 4200, 2));
arrayI.push (new Inmueble("Emilio Olmos 324", "Centro", 150000, 9000, 4));
arrayI.push (new Inmueble("Caseros 1000", "Alberdi", 90000, 5800, 3));

const arrayInmueblesJSON = JSON.stringify(arrayI);
localStorage.setItem('arrayI',arrayInmueblesJSON);
const arrayInmuebles = JSON.parse(arrayInmueblesJSON);

/*Listado de todos los barrios que existan en arrayInmuebles*/
let listaBarrios= [];
arrayInmuebles.forEach((el)=>{listaBarrios.push(el.barrio)});
/*Elimina los elementos repetidos del listado*/
listaBarrios = listaBarrios.filter((el, index)=>{return listaBarrios.indexOf(el)===index});

let select = document.createElement("select");
select.innerHTML=`<option value="Barrio">Barrio</option>`
document.body.appendChild(select);
select.classList.add("barrios");

/*Agrega los barrios como opciones a select*/
for (i in listaBarrios){
    let option = document.createElement("option");
    option.text = listaBarrios[i];
    option.value = listaBarrios[i];
    select.add(option);
}

let barrioSelect= (input,selector)=>{
    document.querySelectorAll(selector).forEach((el)=>
                el.textContent.includes(input)
                ? el.parentNode.classList.remove("filter")
                : el.parentNode.classList.add("filter")
            );
}
/*Llama a la funcion cada vez que el select cambia*/
select.onchange = ()=>{barrioSelect(select.value,".district")};

let selectAmb = document.createElement("select");
document.body.appendChild(selectAmb);
selectAmb.classList.add("ambientes");
selectAmb.innerHTML=
    `<option value="Ambientes">Ambientes</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>4</option>`;

let AmbientSelect= (input,selector)=>{
    document.querySelectorAll(selector).forEach((el)=>
                el.textContent.includes(input)
                ? el.parentNode.classList.remove("filter")
                : el.parentNode.classList.add("filter")
            );
}
/*Llama a la funcion cada vez que el select cambia*/
selectAmb.onchange = ()=>{AmbientSelect(selectAmb.value,".ambient")};

let search = document.createElement("input");
document.body.appendChild(search);
search.type = "search";
search.id = "propertieSearch";

arrayInmuebles.forEach((el)=>{
    let listaPropiedades = document.createElement("ul");
    listaPropiedades.innerHTML=
    `<li>Dirección: <span class="direction">${el.direccion}</span></li>
    <li class="district">Barrio: ${el.barrio}</li>
    <li>Alquiler: ${el.valor}</li>
    <li>Expensas: ${el.expensas}</li>
    <li class="ambient">Ambientes: ${el.ambientes}</li></br>`;
    document.body.appendChild(listaPropiedades);
})
let palabra;
let buscador= (input,selector)=>{
    document.addEventListener("keyup", (e)=>{
        if(e.target.matches(input)){
            palabra = e.target.value;
            if(e.key=="Escape")palabra="";
            document.querySelectorAll(selector).forEach((el)=>
                el.textContent.toLowerCase().includes(palabra.toLowerCase())
                ? (el.parentNode).parentNode.classList.remove("filter")
                : (el.parentNode).parentNode.classList.add("filter")
            );
        }
    })
}
