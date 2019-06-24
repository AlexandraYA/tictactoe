
export default class CalculateWinner {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.rowsArr = [];
    this.colsArr = [];
    this.winGroups = [];

    // заполнение массива this.winGroup выигрышными комбинациями
    this.calcWinGroups(rows, cols);
  }

  calcWinGroups(rows, cols) {
    let rowsWinGroup = [];
    let colsWinGroup = [];

    for (let i = 0; i < rows; i++) {
      let temp = [];

      for (let j = 0; j < cols; j++) {
        temp.push(rows * i + j);
      }

      for (let x = 0; x < cols - 2; x++) {
        rowsWinGroup.push(temp.slice(x, x + 3));
      }
      
      this.rowsArr.push(temp);
    }

    console.log("rowsArr = ", this.rowsArr);
    console.log("rowsWinGroup = ", rowsWinGroup);

    for (let i = 0; i < rows; i++) {
      let temp = [];

      for (let j = 0; j < cols; j++) {
        temp.push(cols * j + i);
      }

      for (let x = 0; x < cols - 2; x++) {
        colsWinGroup.push(temp.slice(x, x + 3));
      }
      
      this.colsArr.push(temp);
    }

    console.log("colsArr = ", this.colsArr);
    console.log("colsWinGroup = ", colsWinGroup);
    
    let c1 = 0;
    let c2 = c1 + 1;
    let c3 = c2 + 1;

    let r1 = 0;
    let r2 = r1 + 1;
    let r3 = r2 + 1;
    let N = cols - c3;

    let tempD = [];

    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        
        tempD.push([r1*rows + c1, r2*rows + c2, r3*rows + c3]);

        c1++;
        c2++;
        c3++;        
      }    

      c1 = 0;
      c2 = c1 + 1;
      c3 = c2 + 1;

      r1++;
      r2++;
      r3++;
    }

    //console.log('tempD = ', tempD);

    let tempDV = [];
    c1 = cols - 1;
    c2 = c1 - 1;
    c3 = c2 - 1;

    r1 = 0;
    r2 = r1 + 1;
    r3 = r2 + 1;
    let start = c3;

    for (let j = 0; j < N; j++) {
      for (let i = start; i >= 0; i--) {     
        tempDV.push([r1*cols + c1, r2*cols + c2, r3*cols + c3]);
        c1--;
        c2--;
        c3--;        
      }    

      c1 = cols - 1;
      c2 = c1 - 1;
      c3 = c2 - 1;

      r1++;
      r2++;
      r3++;
    }

    //console.log('tempDV = ', tempDV);
    this.winGroups = rowsWinGroup.concat(colsWinGroup,tempD,tempDV);
  }

  calcRow(n) {
    let row = null;
  
    for (let i = 0; i < this.cols; i++) {
      if (this.rowsArr[i].indexOf(n) > -1) {
        row = i;
        return ++row;
      }
    }
        
    return 0;
  }

  calcCol(n) {   
    let col = null;
  
    for (let i = 0; i < this.rows; i++) {
      if (this.colsArr[i].indexOf(n) > -1) {
        col = i;
        return ++col;
      }
    }
               
    return 0;
  }

  getWinner(squares) {
    for (let i = 0; i < this.winGroups.length; i++) {
      const [a, b, c] = this.winGroups[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          row: this.winGroups[i]
        };
      }
    }
    return null;
  }
}
  