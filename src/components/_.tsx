import * as React from 'react';
import './_.css';

export interface IHelloProps {
    name: string;
    enthusiasmLevel?: number;
    increment?: () => void;
    decrement?: () => void;
    fetchLanguage?: (language: string) => void;
}

export class Hello extends React.Component<IHelloProps> {

    public componentDidMount() {
        this.props.fetchLanguage!('C#');
    }

    public render() {
        const greeting = this.props.enthusiasmLevel! <= 0
            ? (<div className='hello-error'>You could be a little more enthusiastic</div>)
            : (<div className='hello-greeting'>
                {`Hello ${this.props.name}${'!'.repeat(this.props.enthusiasmLevel!)}`}
            </div>);

        return (
            <div>
                {greeting}

                <button onClick={this.props.increment}>+</button>
                <button onClick={this.props.decrement}>-</button>
            </div>
        );
    }
}
