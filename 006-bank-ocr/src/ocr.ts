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
        let allCharsEqual = true;
        for (let row = 0; row < 4 && allCharsEqual; ++row) {
            allCharsEqual = inputLines[row] === this.lines[row];
        }

        return allCharsEqual;
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

    constructor() {
        this.characters = NUMERALS.map(
            (numeral, index) => new OCRNumeral(numeral, index)
        );
    }

    private parseCharacter(lines: string[]): OCRCharacter {
        const matchedCharacter = this.characters.find(
            (char: OCRCharacter) => char.check(lines)
        );

        return matchedCharacter || new OCRNone(lines);
    }

    private calculateChecksum(code: OCRCharacter[]) : number {
        return code.reduce(
            (acc, obj, index) => acc + (9 - index)*obj.value(),
            0
        );
    }

    private getSuffix(code: OCRCharacter[]) : string {
        if (code.some(obj => obj instanceof OCRNone))
            return 'ILL';

        return '   ';
        }

    private parseCode(lines: string[]): string {
        const separatedChars = Array.from(
            Array(9).keys(),
            pos => lines.map(line => line.slice(4*pos, 4*(pos+1)))
        );

        const code = separatedChars.map(
            lines => this.parseCharacter(lines)
        );

        const suffix = this.getSuffix(code);

        return `${code.map(e => e.toString()).join('')} ${suffix}`;
    }

    public parse(lines: string[]): string[] {
        const result: string[] = [];
        for (let i = 0; i < lines.length; i += 4) {
            result.push(this.parseCode(lines.slice(i, i+4)));
        }

        return result;
    }
}
