// рендер нескольких компонентов
function NumberList(props) {
    const numbers = props.numbers;
    const listUtems = numbers.map((number) => {
        <li key={number.toSting()}>
            {number}
        </li>
    });
    
    return <ul>{listUtems}</ul>;

    // map() в JSX
    
    // return (
    //     <ul>
    //         {numbers.map((number) => {
    //             <li key={number.toSting()}>
    //                 {number}
    //             </li>
    //         })}
    //     </ul>
    // );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
