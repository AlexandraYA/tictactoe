import React from 'react';
import Cell from './cell';


export default class Row extends React.Component {

    renderCell(i) {
        let win = this.props.winRow ? this.props.winRow.row.some((item) => item === i) : false;
        return <Cell key={i} value={this.props.squares[i]} winCell={win} onClick={() => this.props.onClick(i)} />
    }

    render() {
        return (
            <div className="board-row">
                {this.props.indexArr.map((index) => {
                    return this.renderCell(index);
                })}
            </div>
        );
    }    
}