import Component from "js/component";

class Echo implements Component {
    run() {
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
    }
}

export default Echo;
