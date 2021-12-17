import { Code2Letter } from './../2to3/index';

export type FlagEmoji = {
    flag: string
};

export function getFlag(c:Code2Letter) {
    return String.fromCodePoint(...[...c.toUpperCase()].map(x=>0x1f1a5+x.charCodeAt(0)));
}
