import React from 'react';
import Board from './board';
import calculateWinner from './helpers/calculateWinner';
import calcRow from './helpers/calculateRow';
import calcCol from './helpers/calculateCol';

export default class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            initRows: 3,
            initCols: 3,
            finalStep: 9,
            winRow: null,
            xIsNext: true,
            history: [{
                squares: Array(9).fill(null),
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
        const col = calcCol(i);
        const row = calcRow(i);

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        let lastStepNumber = this.state.stepNumber;
        this.setState({
            history: history.concat([{squares, col, row}]),
            xIsNext: !xIsNext,
            stepNumber: ++lastStepNumber,
            winRow: calculateWinner(squares)
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

    render() {
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