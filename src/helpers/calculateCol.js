
export default function calcCol(n) {
    let col = null;    
    if (n === 0 || n === 3 || n === 6) {
        col = 1
    } else if (n === 1 || n === 4 || n === 7) {
        col = 2
    } else if (n === 2 || n === 5 || n === 8) {
        col = 3
    }    
    return col;
}
