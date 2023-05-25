setTimeout(rotateTitle, 250);

function rotateTitle(prependSpace = true) {
    const firstChar = document.title.substring(0, 1);
    const nextCharIsSpace = document.title.substring(1, 2) === " ";
    const space = prependSpace === true ? " " : "";

    const newTitle = document.title.substring(1) + space + firstChar;
    document.title = newTitle;

    setTimeout(() => rotateTitle(nextCharIsSpace), 250);
}

// ---------------------------------------------------------------------- Custom Cursor

const { gsap } = window;

const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");
let isStuck = false;
let mouse = {
	x: -100,
	y: -100,
};

// Just in case you need to scroll
let scrollHeight = 0;
window.addEventListener('scroll', function(e) {
	scrollHeight = window.scrollY
})

let cursorOuterOriginalState = {
	width: cursorOuter.getBoundingClientRect().width,
	height: cursorOuter.getBoundingClientRect().height,
};
const buttons = document.querySelectorAll("main button");

buttons.forEach((button) => {
	button.addEventListener("pointerenter", handleMouseEnter);
	button.addEventListener("pointerleave", handleMouseLeave);
});

document.body.addEventListener("pointermove", updateCursorPosition);
document.body.addEventListener("pointerdown", () => {
	gsap.to(cursorInner, 0.15, {
		scale: 2,
	});
});
document.body.addEventListener("pointerup", () => {
	gsap.to(cursorInner, 0.15, {
		scale: 1,
	});
});

function updateCursorPosition(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}

function updateCursor() {
	gsap.set(cursorInner, {
		x: mouse.x,
		y: mouse.y,
	});

	if (!isStuck) {
		gsap.to(cursorOuter, {
			duration: 0.15,
			x: mouse.x - cursorOuterOriginalState.width/2,
			y: mouse.y - cursorOuterOriginalState.height/2,
		});
	}

	requestAnimationFrame(updateCursor);
}

updateCursor();

function handleMouseEnter(e) {
	isStuck = true;
	const targetBox = e.currentTarget.getBoundingClientRect();
	gsap.to(cursorOuter, 0.2, {
		x: targetBox.left, 
		y: targetBox.top + scrollHeight,
		width: targetBox.width,
		height: targetBox.width,
		borderRadius: 0,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
	});
}

function handleMouseLeave(e) {
	isStuck = false;
	gsap.to(cursorOuter, 0.2, {
		width: cursorOuterOriginalState.width,
		height: cursorOuterOriginalState.width,
		borderRadius: "50%",
		backgroundColor: "transparent",
	});
}


// -#############################################################################

/* -- Glow effect -- */

const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}

/* -- Text effect -- */

const letters = "abcdefghijklmnopqrstuvwxyz";

let interval = null;

const screen = document.querySelector(".screen"),
      name = document.querySelector(".name");

screen.onmouseenter = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    name.innerText = name.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return name.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= name.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}


// -------------------------------------------------------------- Animated AI core


gsap.config({trialWarn: false});
let select = s => document.querySelector(s),
		toArray = s => gsap.utils.toArray(s),
		mainSVG = select('#mainSVG'),
		allEll = toArray('.ell'),
		colorArr = ['#359EEE', '#FFC43D','#EF476F','#03CEA4']

let colorInterp = gsap.utils.interpolate(colorArr);

gsap.set(mainSVG, {
	visibility: 'visible'
})

function animate (el, count) {
	let tl = gsap.timeline({
	defaults: {
		ease: 'sine.inOut'
	},
		repeat: -1
});
	gsap.set(el, {
		opacity:1- count/(allEll.length),
		stroke: colorInterp(count/(allEll.length))
	})

	tl.to(el, {
	attr: {
		ry: `-=${count*2.3}`,
		rx: `+=${count*1.4}`
	},
	ease: 'sine.in'
})
.to(el, {
	attr: {
		ry: `+=${count*2.3}`,
		rx: `-=${count*1.4}`
	},
	ease: 'sine'
})
.to(el, {
	duration: 1,
	rotation: -180,
	transformOrigin: '50% 50%'
}, 0).timeScale(0.5)
}
allEll.forEach((c, i) => {
	gsap.delayedCall(i/(allEll.length-1), animate, [c, i+1])
})
gsap.to('#aiGrad', {
	duration: 4,
	delay: 0.75,
	attr: {
		x1: '-=300',
		x2: '-=300'
	},
	scale: 1.2,
	transformOrigin: '50% 50%',
	repeat: -1,
	ease: 'none'
})
 gsap.to('#ai', {
	duration: 1,
	scale: 1.1,
	transformOrigin: '50% 50%',
	repeat: -1,
	yoyo: true,
	ease: 'sine.inOut'
}) 




 // ################################################ Marix BG

 const canvas = document.getElementById("matrix-canvas");
 const ctx = canvas.getContext("2d");

 // Set font properties
 const fontSize = 13;
 const fontFamily = "Courier New";
 const charSet = "01";
 // Set initial values for character raindrops
 let drops = [];

 // Function to update canvas size and raindrop positions
 function updateCanvasSize() {
   // Set canvas size to match window size
   canvas.width = window.innerWidth;
   canvas.height = document.documentElement.scrollHeight + 50;

   // Recalculate number of raindrop columns and reset raindrop positions
   let columnCount = Math.ceil(canvas.width / fontSize);
   drops = [];
   for (let i = 0; i < columnCount; i++) {
	 drops[i] = -Math.round(Math.random() * canvas.height / fontSize) * fontSize;
   }
 }

 // Call updateCanvasSize on initial page load
 updateCanvasSize();

 // Main animation loop
 function draw() {
   // Set canvas background color and fill
   ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
   ctx.fillRect(0, 0, canvas.width, canvas.height);

   // Set font properties for raindrop characters
   ctx.font = fontSize + "px " + fontFamily;
   ctx.fillStyle = "#FF0000";

   // Draw raindrop characters
   for (let i = 0; i < drops.length; i++) {
	 const charIndex = Math.floor(Math.random() * charSet.length);
	 const char = charSet[charIndex];
	 const x = i * fontSize;
	 const y = drops[i];
	 ctx.fillText(char, x, y);

	 // Move raindrop down
	 drops[i] += fontSize;

	 // Reset raindrop position if it reaches the bottom of the screen
	 if (drops[i] > canvas.height) {
	   drops[i] = -fontSize;
	 }
   }
 }

 // Start animation loop
 setInterval(draw, 50);

 // Call updateCanvasSize when window is resized
 window.addEventListener("resize", updateCanvasSize);