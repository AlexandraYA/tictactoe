import React from 'react';


export default function Cell(props) {
    let className = props.winCell ? "square winner" : "square";

    return (
        <button className={className} onClick={() => props.onClick()}>{props.value}</button>
    );
}