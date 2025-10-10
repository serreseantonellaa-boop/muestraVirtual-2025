let nombres = ['Lola Mazza','Luciano Neiman', 'Martin Israel', 'Mia Carini', 'Micaela Gutterman','Valentin Sierra'];
let fotos = ['lola.png','lucho.png','martin.png','mia.png','micaela.png','valentin.png'];
let srcs = ['lola', 'lucho','martin','mia','micaela','valentin'];

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