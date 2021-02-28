export default `
start =
    children:(chapter+ / .* { return []; })
    {
        return {
            children,
            type: 'root',
            position: location()
        };
    }

chapter =
    '\c'
    space
    id:number
    newline
    verses:verse+
    {
        return {
            id,
            type: 'chapter',
            children: verses,
            position: location()
        };
    }

verse =
    '\x0B'
    space
    id:number
    space
    text:string
    {
        return {
            id,
            text,
            type: 'verse',
            position: location()
        };
    }

space =
    ' '

newline =
    '\\n'

number =
    [0-9]+
    {
        const input = text();

        return parseInt(input);
    }

string =
    [^\\n]+
    {
        return text();
    }
`;