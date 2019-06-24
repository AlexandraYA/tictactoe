import React from 'react';
import Board from './board';
import Welcome from './welcome';
import CalculateWinner from './helpers/calculateWinner';

export default class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            start: true,
            initRows: 5,
            initCols: 5,
            finalStep: 25,
            /* выигрывшая комбинация, передается в row для подсветки ячеек */
            winRow: null,
            xIsNext: true,
            history: [{
                squares: Array(0).fill(null),
                row: null,
                col: null
            }],
            stepNumber: 0
        };
    }

    handleClick(i) {
        const {xIsNext, history} = this.state;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const col = this.state.calculator.calcCol(i);
        const row = this.state.calculator.calcRow(i);

        if (this.state.calculator.getWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        let lastStepNumber = this.state.stepNumber;
        this.setState({
            history: history.concat([{squares, col, row}]),
            xIsNext: !xIsNext,
            stepNumber: ++lastStepNumber,
            winRow: this.state.calculator.getWinner(squares)
        });
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) ? false : true
        });
    }

    renderMoves(stepNumber) {
        return this.state.history.map((step, move) => {
            const desc = move ? 'Move #' + move + " (row " + step.row + ", col " + step.col + ")" : 'Start Game';
            let styleActive = (stepNumber === move) ? "active" : "";
            return (
                <li key={move}>
                    <a href="#" className={styleActive} onClick={() => this.jumpTo(move)} >{desc}</a>
                </li>
            );
        });
    }

    startGame(rows) {
        let finalStep = rows * rows;
        this.setState({
            start: false,
            initRows: rows,
            initCols: rows,
            finalStep: finalStep,
            history: [{
                squares: Array(finalStep).fill(null),
                row: null,
                col: null
            }],
            calculator: new CalculateWinner(rows,rows)
        });
    }

    render() {

        if (this.state.start) {
            return (
                <Welcome onClick={(rows) => this.startGame(rows)}/>
            )
        } else {
            const {xIsNext, history, stepNumber} = this.state;
            const current = history[stepNumber];
            const winner = this.state.winRow ? this.state.winRow.winner : false;
    
            let status;
            if (winner) {
                status = 'Winner is: ' + winner;
            } else {
                status = 'Next player is: ' + (xIsNext ? 'X' : 'O');
            }

            return (
                <div className="game">
                    <div className="game-board">
                        <Board
                            rows={this.state.initRows}
                            cols={this.state.initCols}
                            winRow={this.state.winRow}
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    {this.state.finalStep === stepNumber ? (
                            <div className="game-over">Game Over</div>
                        ) : null
                    }                
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{this.renderMoves(stepNumber)}</ol>
                    </div>
                </div>
            );
        }
    }
}