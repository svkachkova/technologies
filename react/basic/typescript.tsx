import React from 'react';

export interface StandardComponentProps {
    title?: string;
    children: React.ReactNode;
}

export function StandardComponent({ 
    children, 
    title = 'Dr.' 
}: StandardComponentProps) {
    return (
        <div>
            {title}: {children}
        </div>
    );
}

// наш компонент принимает любые стандартные свойства div 
// в дополнение к заголовку и наследникам
export interface SpreadingExampleProps
    extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    children: React.ReactNode;
}

export function SpreadingExample({
    children,
    title = 'Dr.',
    ...other
}: SpreadingExampleProps) {
    return (
        <div {...other}>
            {title}: {children}
        </div>
    );
}

// обработка событий
export interface EventHandlerProps {
    onClick: (e: React.MouseEvent) => void;
}
  
export function EventHandler({ onClick }: EventHandlerProps) {
    // handle focus events in a separate function
    function onFocus(e: React.FocusEvent) {
        console.log('Focused!', e.currentTarget);
    }
  
    return (
        <button
            onClick={onClick}
            onFocus={onFocus}
            onKeyDown={e => {
            // When using an inline function, the appropriate argument signature
            // is provided for us
            }}
        >
        Click me!
        </button>
    );
}

// через класс
class Hello extends React.Component<Props, object> {
    render() {
        const { name, enthusiasmLevel = 1 } = this.props;
  
        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }
  
        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(enthusiasmLevel)}
                </div>
            </div>
        );
    }
}

// class + state
export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

interface State {
    currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { 
            currentEnthusiasm: props.enthusiasmLevel || 1 
        };
    }

    onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
    onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);

    render() {
        const { name } = this.props;

        if (this.state.currentEnthusiasm <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
                </div>
                <button onClick={this.onDecrement}>-</button>
                <button onClick={this.onIncrement}>+</button>
            </div>
        );
    }

    updateEnthusiasm(currentEnthusiasm: number) {
        this.setState({ currentEnthusiasm });
    }
}

export default Hello;

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}
