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



// --------------------------------------------------------------------------- Title text


class TextGlitch {
	constructor( root ) {
		this._root = root;
		this._elClips = root.querySelectorAll( ".TextGlitch-clip" );
		this._elWords = root.querySelectorAll( ".TextGlitch-word" );
		this._frame = this._frame.bind( this );
		this._unglitch = this._unglitch.bind( this );
		this._frameId = null;
		this._text = "";
		this._textAlt = [];
		Object.seal( this );

		this.setTexts( [
			"Evil to the Core",
			"EVIL TO THE CORE",
			"ΣVIᒪ ƬӨ ƬΉΣ ᑕӨЯΣ",
			"3v!1 70 7h3 C0r3",
		] );
	
	}

	on() {
		if ( !this._frameId ) {
			this._frame();
		}
	}
	off() {
		clearTimeout( this._frameId );
		this._frameId = null;
		this._unglitch();
	}
	setTexts( [ text, ...alt ] ) {
		this._text = text;
		this._textAlt = alt;
	}

	// private:
	// .....................................................................
	_frame() {
		this._glitch();
		setTimeout( this._unglitch, 50 + Math.random() * 200 );
		this._frameId = setTimeout( this._frame, 250 + Math.random() * 750 );
	}
	_glitch() {
		this._addClipCSS();
		this._textContent( this._randText() );
		this._root.classList.add( "TextGlitch-blended" );
	}
	_unglitch() {
		this._removeClipCSS();
		this._textContent( this._text );
		this._root.classList.remove( "TextGlitch-blended" );
	}
	_textContent( txt ) {
		this._elWords.forEach( el => el.textContent = txt );
	}

	// CSS clip-path, to cut the letters like an overflow:hidden
	// .....................................................................
	_addClipCSS() {
		const clips = this._elClips,
			clip1 = this._randDouble( .1 ),
			clip2 = this._randDouble( .1 );

		clips[ 0 ].style.transform = `translate(${ this._randDouble( .3 ) }em, .02em)`;
		clips[ 2 ].style.transform = `translate(${ this._randDouble( .3 ) }em, -.02em)`;
		clips[ 0 ].style.clipPath = `inset( 0 0 ${ .6 + clip1 }em 0 )`;
		clips[ 1 ].style.clipPath = `inset( ${ .4 - clip1 }em 0 ${ .3 - clip2 }em 0 )`;
		clips[ 2 ].style.clipPath = `inset( ${ .7 + clip2 }em 0 0 0 )`;
	}
	_removeClipCSS() {
		this._elClips.forEach( el => {
			el.style.clipPath =
			el.style.transform = "";
		} );
	}

	// Switch some chars randomly
	// .....................................................................
	_randText() {
		const txt = Array.from( this._text );

		for ( let i = 0; i < 12; ++i ) {
			const ind = this._randInt( this._text.length );

			txt[ ind ] = this._textAlt[ this._randInt( this._textAlt.length ) ][ ind ];
		}
		return txt.join( "" );
	}

	// rand utils
	// .....................................................................
	_randDouble( d ) {
		return Math.random() * d - d / 2;
	}
	_randInt( n ) {
		return Math.random() * n | 0;
	}
}

const elTitle = document.querySelector( "#title" );
const glitch = new TextGlitch( elTitle );

glitch.on();

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