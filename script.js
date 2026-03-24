const hamburger=document.querySelector(".hamburger");
const navLinks=document.querySelector(".nav-links");
const links=document.querySelectorAll(".nav-links a");
const overlay = document.querySelector(".overlay");


hamburger. addEventListener("click",() => {
	navLinks.classList.toggle("active");
	hamburger.classList.toggle("active");
	overlay.classList.toggle("active");
});	

links.forEach(link => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("active");
		hamburger.classList.remove("active");
	});
});	

overlay.addEventListener("click", () =>{
	navLinks.classList.remove("active");
	hamburger.classList.remove("active");
	overlay.classList.remove("active");
});


/* Particules d'arriere plan */
const canvas = document.getElementById("bg-canvas");
const ctx=canvas.getContext("2d");/*outils de dessin*/

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particules = [] /*tableau pour contenir les particules*/
let numberParticles = window.innerWidth < 768 ? 60 : 100;
for (let i=0;i<numberParticles;i++){
	particules.push({
		x: Math.random()*canvas.width,
		y: Math.random()*canvas.height,
		
		vx:(Math.random()-0.5)*(Math.random()*1.5),/*vitesse variable*/
		vy:(Math.random()-0.5)*(Math.random()*1.5),
		
		size: 3,
		
		phase: Math.random()*Math.PI*2
	});
}

/*reaction a la souris*/
let mouse= { x: null, y:null};
window.addEventListener("mousemove",(e)=>{
	mouse.x=e.x;
	mouse.y=e.y;
});	


function animate(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	// dessiner les particules
	particules.forEach(p=>{
		p.x += p.vx;
		p.y += p.vy;
		if (p.x<0 || p.x>canvas.width) p.vx *= -1;
		if (p.y<0 || p.y>canvas.height) p.vy *= -1;
		ctx.beginPath(); /*commence un nouveau dessin*/
		ctx.shadowBlur = 10;
		ctx.shadowColor = "#00c500";
		
		/*taille des points varie */
		p.phase+=0.05;
		let size=p.size+Math.sin(p.phase)*1.5;
		
		let scrollFactor = window.scrollY*0.0005;/*reaction au scroll*/
		ctx.arc(p.x, p.y+scrollFactor*50, size,0,Math.PI*2);
		
		ctx.fillStyle="#00c500";
		ctx.fill();
	});	
	
	// dessiner les lignes (EN DEHORS du forEach)
	for (let i=0;i<particules.length;i++){
		for(let j=i+1;j<particules.length;j++){
			let dx=particules[i].x - particules[j].x;
			let dy=particules[i].y - particules[j].y;
			
			let distance = Math.sqrt(dx*dx + dy*dy);
			if (distance<100){
				ctx.beginPath();
				ctx.moveTo(particules[i].x,particules[i].y);
				ctx.lineTo(particules[j].x,particules[j].y);
				
				/*ligne dynamique; apparait si proche sinon disparrait*/
				let alpha = 1 - (distance / (100));
				ctx.strokeStyle = `rgba(26,175,203,${alpha})`;
				
				
				ctx.lineWidth=1;
				ctx.stroke();
			}
		}
	}	
	
	/* reaction a la souris */
	particules.forEach(p=>{	
		let dx=p.x - mouse.x;
		let dy=p.y - mouse.y;	
		let distance = Math.sqrt(dx*dx + dy*dy);
		
		if (distance < 100){
			ctx.beginPath();
			ctx.moveTo(p.x,p.y);
			ctx.lineTo(mouse.x,mouse.y);
			ctx.strokeStyle = "rgba(0,255,200,0.3)";
			ctx.lineWidth=1;
			ctx.stroke();
		}
	});	
	
	
	requestAnimationFrame(animate); /* execute l'animation au frame suivant */
}	
animate();	
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});


/*Animation au scroll */

const faders=document.querySelectorAll('.fade-in');

const appearOptions={
	threshold:0.1,//déclenche quand 10% de l'élément est visible
	rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver /*détecte quand l'élément devient visible à l'écran*/(function (entries ,observer){
	entries.forEach(entry => {
		if(entry.isIntersecting){
			entry.target.classList.add('show');//ajoute la classe show
			observer.unobserve(entry.target); // stop l'observation pour éviter la répétition
		}
	});
}, appearOptions);		

//observer chaque élément
faders.forEach(fader => {
	appearOnScroll.observe(fader);
});		


/*réponse au form*/

const contactForm= document.getElementById("contact-form");
const formResponse= document.getElementById("form-response");

contactForm.addEventListener("submit",function (e){
	e.preventDefault();
	
	const formData=new FormData(contactForm);//objet pour envoyer le form à formspree 
	
	fetch(contactForm.action,{ //envoie des données à formspree
		method: "POST",
		body: formData,
		headers:{
			'Accept':'application/json'//réponse en JSON
		}
	}).then(response => {//quand formspree répond...
		formResponse.classList.add("show");//on affiche le message
		if(response.ok){
			formResponse.classList.remove("error");
			formResponse.textContent="Merci! Votre message a été envoyé";
			contactForm.reset(); //réinitialise le form		
		}else{
			formResponse.classList.add("error");
			formResponse.textContent="Oups! Une erreur est survenue. Veuillez réessayer.";
		}
		
	}).catch(() => { //gère les erreurs (connexion, pb formspree)
		formResponse.classList.add("error");
		formResponse.classList.add("show");
		formResponse.textContent="Problème de connexion";	
	});
});	
		
			





		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
