import { data } from './data';

export type Code2Letter = keyof typeof data;

export type Code3Letter = typeof data[Code2Letter];

export function code2to3(c:Code2Letter) {
    return data[c]
}
