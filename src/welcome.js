import React from 'react';


export default class Welcome extends React.Component {
    constructor() {
        super();

        this.state = {
            rows: 3
        };
    }
    
    render() {
        return (
            <div className="welcome">
                <div className="popup">
                    <header>
                        <h2>Бескрайние крестики нолики</h2>
                        <h4>Введите размер стороны поля</h4>
                    </header>                    
                    <form>
                        <div>
                            <input type="number" className="input-start" value={this.state.rows} onChange={(event) => this.setState({rows: event.target.value})}/>
                        </div>
                        <div>
                            <button className="btn-start" onClick={() => this.props.onClick(this.state.rows)}>Играть</button>
                        </div>
                    </form>
                </div>               
            </div>
        );
    }
}