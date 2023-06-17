function useOnKey(callback: ()=>void , keyCode: (keyCodes | keyStrings) ) {

    if (callback === undefined) throw new Error('callback function is required')
    if (keyCode === undefined) throw new Error('keyCode or eventCode are required')


    let allow = true
    const keyFunc= (typeof keyCode) === 'number' ? 
    function (event: KeyboardEvent){
        if(allow && (event.keyCode === keyCode) ){
            event.preventDefault()
            callback()
          }
    }
    : 
    function (event: KeyboardEvent){
        if(allow && (event.code === keyCode) ){
            event.preventDefault()
            callback()
          }
    }
    ;
    
    const switcher = (b:boolean) => {allow = b}

    return [keyFunc, switcher] as [(event:any)=> void, (b:boolean)=>void]
}

export default useOnKey


type keyCodes = 8 | 9 | 13 | 16 | 17 | 18 | 19 | 20 | 27 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 44 | 45 | 46 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 144 | 145 | 173 | 174 | 175 | 181 | 182 | 183 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 219 | 220 | 221 | 222
type keyStrings = 'Backspace' | 'Tab' | 'Enter' | 'Shift' | 'Control' | 'Alt' | 'Pause' | 'CapsLock' | 'Escape' | 'Space' | 'PageUp' | 'PageDown' | 'End' | 'Home' | 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'PrintScreen' | 'Insert' | 'Digit0' | 'Digit1' | 'Digit2' | 'Digit3' | 'Digit4' | 'Digit5' | 'Digit6' | 'Digit7' | 'Digit8' | 'Digit9' | 'KeyA' | 'KeyB' | 'KeyC' | 'KeyD' | 'KeyE' | 'KeyF' | 'KeyG' | 'KeyH' | 'KeyI' | 'KeyJ' | 'KeyK' | 'KeyL' | 'KeyM' | 'KeyN' | 'KeyO' | 'KeyP' | 'KeyQ' | 'KeyR' | 'KeyS' | 'KeyT' | 'KeyU' | 'KeyV' | 'KeyW' | 'KeyX' | 'KeyY' | 'KeyZ' | 'MetaLeft' | 'MetaRight' | 'ContextMenu' | 'Numpad0' | 'Numpad1' | 'Numpad2' | 'Numpad3' | 'Numpad4' | 'Numpad5' | 'Numpad6' | 'Numpad7' | 'Numpad8' | 'Numpad9' | 'NumpadMultiply' | 'NumpadAdd' | 'NumpadSubtract' | 'NumpadDecimal' | 'NumpadDivide' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'NumLock' | 'ScrollLock' | 'AudioVolumeMute' | 'AudioVolumeDown' | 'AudioVolumeUp' | 'LaunchMediaPlayer' | 'Semicolon' | 'Equal' | 'Comma' | 'Minus' | 'Period' | 'Slash' | 'Backquote' | 'BracketLeft' | 'Backslash' | 'BracketRight' | 'Quote'