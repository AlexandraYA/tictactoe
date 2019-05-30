
export default function calcRow(n) {
    let row = null;    
    if (n === 0 || n === 1 || n === 2) {
        row = 1
    } else if (n === 3 || n === 4 || n === 5) {
        row = 2
    } else if (n === 6 || n === 7 || n === 8) {
        row = 3
    }    
    return row;
}
