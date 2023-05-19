const NUMERALS = [
    [' _  ',
     '| | ',
     '|_| ',
     '    '],
    ['    ',
     '  | ',
     '  | ',
     '    '],
    [' _  ',
     ' _| ',
     '|_  ',
     '    '],
    [' _  ',
     ' _| ',
     ' _| ',
     '    '],
    ['    ',
     '|_| ',
     '  | ',
     '    '],
    [' _  ',
     '|_  ',
     ' _| ',
     '    '],
    [' _  ',
     '|_  ',
     '|_| ',
     '    '],
    [' _  ',
     '  | ',
     '  | ',
     '    '],
    [' _  ',
     '|_| ',
     '|_| ',
     '    '],
    [' _  ',
     '|_| ',
     ' _| ',
     '    ']
];

abstract class OCRCharacter {
    protected lines: string[];
    constructor(lines: string[]) {
        this.lines = lines;
    }

    public abstract check(inputLines: string[]) : boolean;

    public abstract value() : any;

    public abstract toString() : string;
}

class OCRNumeral extends OCRCharacter {
    private integerValue: number;
    
    constructor(lines: string[], integerValue: number) {
        super(lines);
        this.integerValue = integerValue;
    }

    public check(inputLines: string[]) : boolean {
        return [...Array(this.lines.length).keys()].every(
            row => inputLines[row] === this.lines[row]
        );
    }

    public value() : any {
        return this.integerValue;
    }

    public toString(): string {
        return this.integerValue.toString(10);
    }
}

class OCRNone extends OCRCharacter {
    public check(_: string[]) : boolean {
        return false;
    }

    public value() {
        return undefined;
    }

    public toString(): string {
        return '?';
    }
}

export class Ocr {
    characters: OCRCharacter[];
    codeLength: number;
    charLength: number;
    OCRHeight: number;

    constructor() {
        this.characters = NUMERALS.map(
            (numeral, index) => new OCRNumeral(numeral, index)
        );

        this.codeLength = 9;
        this.charLength = 4;
        this.OCRHeight = 4;
    }

    private parseCharacter(lines: string[]): OCRCharacter {
        const matchedCharacter = this.characters.find(
            (char: OCRCharacter) => char.check(lines)
        );

        return matchedCharacter || new OCRNone(lines);
    }

    private checksum(code: OCRCharacter[]) : number {
        return code.reduce(
            (acc, obj, index) => acc + (this.codeLength - index)*obj.value(),
            0
        );
    }

    private getSuffix(code: OCRCharacter[]) : string {
        if (code.some(obj => obj instanceof OCRNone))
            return 'ILL';
        if (this.checksum(code) % 11)
            return 'ERR';

        return '   ';
    }

    private parseCode(lines: string[]): string {
        const separatedChars = [...Array(this.codeLength).keys()].map(
            pos => lines.map(line => line.slice(this.charLength*pos, this.charLength*(pos+1)))
        );

        const code = separatedChars.map(
            lines => this.parseCharacter(lines)
        );

        const suffix = this.getSuffix(code);

        return `${code.reduce((acc, char) => acc+char.toString(), "")} ${suffix}`;
    }

    public parse(lines: string[]): string[] {
        if (lines.length < this.OCRHeight)
            return [];

        return [this.parseCode(lines.slice(0, this.OCRHeight))].concat(
            this.parse(lines.slice(this.OCRHeight))
        );
    }
}
