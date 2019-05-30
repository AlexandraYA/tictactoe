import React from 'react';
import Row from './row';



export default class Board extends React.Component {
    
    renderBoard() {
        let rows = [];
        let cols = [];

        for (let j = 0; j < this.props.rows; j++) {            
            for (let x = 0; x < this.props.cols; x++) {
                cols.push(j*this.props.rows + x);
            }
                rows.push(<Row 
                    key={j}
                    winRow={this.props.winRow}
                    squares={this.props.squares} 
                    onClick={(i) => this.props.onClick(i)}
                    indexArr={cols}/>);
                cols = [];
        }
        return rows;
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}