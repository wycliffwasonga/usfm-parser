export default `
start
    = children:(chapter+ / .* { return []; }) { return { type: 'root', children, position: location() }; }

chapter
    = '\c' space id:number newline verses:verse+ { return { type: 'chapter', id, children: verses, position: location() }; }

verse
    = '\x0B' space id:number space text:string { return { type: 'verse', id, text, position: location() }; }

space
    = ' '

newline
    = '\\n'

number
    = [0-9]+ { return parseInt(text()); }

string
    = [^\\n]+ { return text(); }
`;
