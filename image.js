let image = false;
let target = {
            x: 750,
            y: 700,
            }
let seconde = 20;


const phil = document.querySelector('.phil');
const chrono = document.querySelector('.chrono');

window.addEventListener('load', countdown);

function countdown(req, res, query){
	setInterval(function(){
        chrono.innerHTML = seconde;
        seconde -= 1;
	
/*	if (seconde <= 0){ 
        clearInterval(seconde=0);
        window.location = "modele_perdu.html";
    }*/   


    }, 1000)
};
window.addEventListener('mousedown', mousedown);

function mousedown(e) {
    image = true;
};

window.addEventListener('mousemove', mousemove);

function mousemove(e){
    e.preventDefault();
    if(image === true) {
        phil.style.top = e.clientY + "px";
        phil.style.left = e.clientX + "px";
    }
};

window.addEventListener('mouseup', mouseup);

function mouseup(e) {
    let distance;
    let seuil = 100;
	distance = calcul(target, e);
	image = false;
    if(distance <= seuil) {
        window.location = "req_laby";
    }
};

function calcul(target, e) {
    return Math.sqrt((e.clientX - target.x)**2 + (e.clientY - target.y)**2);
};
