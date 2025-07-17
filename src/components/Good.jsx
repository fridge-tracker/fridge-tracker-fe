const Good = ({data}) => {
    console.log(data)
    const {name, timeStored, bestBeforeDate} = data;

    return (
        <div className="element-container">
            <div className="element-description">
                <span>name: {name}</span>
                <span>stored time: {timeStored}</span>
                <span>best before date: {bestBeforeDate}</span>
            </div>
        </div>
    );
};

export default Good;