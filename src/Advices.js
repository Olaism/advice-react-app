const Advices = ({advices}) => {
    const displayAdvices = advices.map((advice) => {
        <h3>{advice}</h3>
    })
    return (
        {displayAdvices}
    );
}
 
export default Advices;