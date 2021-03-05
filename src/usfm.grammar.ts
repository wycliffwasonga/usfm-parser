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


    imt_marker =
    '\imt'
    [1-3]?
    space
    text:string
    {
        return {
            text
        };
    }

is_marker =
    '\is'
    [1-3]?
    space
    text:string
    {
        return {
            text
        };
    }

ip_marker =
    '\ip'
    indented:'i'?
    space
    text:string
    {
        return {
            text,
            indented: indented !== null
        };
    }

im_marker =
    '\im'
    indented:'i'?
    space
    text:string
    {
        return {
            text,
            indented: indented !== null
        };
    }

ipq_marker =
    '\ipq'
    space
    text:string
    {
        return {
            text
        };
    }

imq_marker =
    '\imq'
    space
    text:string
    {
        return {
            text
        };
    }

ipr_marker =
    '\ipr'
    space
    text:string
    {
        return {
            text
        };
    }

iq_marker =
    '\iq'
    [1-3]?
    space
    text:string
    {
        return {
            text
        };
    }

ib_marker =
    '\ib'
    {
        return {};
    }

ili_marker =
    '\ili'
    [1-3]?
    space
    text:string
    {
        return {
            text
        };
    }

iot_marker =
    '\iot'
    space
    text:string
    {
        return {
            text
        };
    }

io_marker =
    '\io'
    [1-3]?
    space
    text:([^\\(]* { return text(); })
    '(' reference_range:reference_range ')'
    {
        return {
            text,
            reference_range
        };
    }

ior_marker =
    '\ior'
    space
    '('
    reference_range:reference_range
    ')'
    '\ior*'
    {
        return {
            reference_range
        };
    }

iqt_marker =
    '\iqt'
    space
    text:string
    '\iqt*'
    {
        return {
            text
        };
    }

iex_marker =
    '\iex'
    space
    text:string
    {
        return {
            text
        };
    }

imte#_marker =
    '\imte'
    [1-3]?
    space
    text:string
    {
        return {
            text
        };
    }

ie_marker =
    '\ie'
    {
        return {};
    }

reference_range =
    start:reference
    '-'
    end:(
        reference / verse:number 
        { 
            return {
                verse,
                chapter: start.chapter
            };
        }
    )
    {
        return {
            start,
            end
        }
    }

reference =
    chapter:number '.' verse:number
    {
        return {
            chapter,
            verse
        }
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
