let nombres = ['Cami Zalcman','Julian Riquelme','Lola Mazza','Luciano Neiman', 'Martin Israel', 'Mia Carini', 'Micaela Gutterman','Sebi Rotbard','Sofi Villaruel','Tobias Arraiza','Valentin Sierra','Vicky Villalba'];
let fotos = ['cami.png','julian.png','lola.png','lucho.png','martin.png','mia.png','micaela.png','sebi.png','sofi.png','tobi.png','valentin.png','vicky.png'];
let srcs = ['cami','julian','lola', 'lucho','martin','mia','micaela','sebi','sofi','tobi','valentin','vicky'];

const grid = document.getElementById('grid-container');

for(let i = 0; i < nombres.length; i++){
    let card = document.createElement('div');
    card.className = 'card'
    let titulo = document.createElement('h1');
    titulo.className = 'space'
    titulo.textContent = nombres[i];
    card.appendChild(titulo);
    let link = document.createElement('a');
    link.setAttribute('href','assets/tps/' + srcs[i]+'/index.html');
    let foto = document.createElement('img');
    foto.setAttribute('src','assets/imgs/' + fotos[i]);
    link.appendChild(foto)
    card.appendChild(link)
    grid.appendChild(card)
}