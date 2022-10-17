
function Square(props) {
    return (
        <button className={(props.value != null ? props.value + " " : "") + (props.highlight ? "highlight " : "") + "square"}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square