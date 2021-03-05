import books from './books';

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

id_marker =
    '\id'
    space
    id:(${books.map(book => `'${book.identifier}'`).join(' / ')})
    {
        return {
            id
        };
    }

usfm_marker = 
    '\x75sfm'
    space
    version:string
    {
        return {
            version
        };
    }

ide_marker =
    '\ide'
    space
    encoding:('CP-1252' / 'CP-1251' / 'UTF-8' / 'UTF-16')
    {
        return {
            encoding
        };
    }

sts_marker =
    '\sts'
    space
    status_code:number
    {
        return {
            status_code
        };
    }

rem_marker =
    '\\rem'
    space
    remark:string
    {
        return {
            text: remark
        };
    }

h_marker =
    '\h'
    space
    text:string
    {
        return {
            text
        };
    }

toc_marker =
    '\\toc'
    'a'?
    [1-3]
    space
    text:string
    {
        return {
            text
        };
    }

chapter =
    '\c'
    space
    id:number
    newline
    verses:(
        first:verse
        rest:(newline verse:verse { return verse; })*
        {
            return [
                first,
                ...rest
            ];
        }
    )
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
