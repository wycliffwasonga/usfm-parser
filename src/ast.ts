interface Common {
    type: string;
    position: Position;
}

interface Node extends Common {
    children: Array<Node | Leaf>;
}

interface Leaf extends Common {
}

export interface Location {
    line: number;
    column: number;
    offset: number;
}

export interface Position {
    start: Location;
    end: Location;
}

export interface Document extends Node {
    children: Array<Chapter>;
}

export interface Chapter extends Node {
    id: number;
    children: Array<Verse>;
}

export interface Verse extends Leaf {
    id: number;
    text: string;
}
