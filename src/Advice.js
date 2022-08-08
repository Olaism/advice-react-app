import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

const Advice = ({selectedAdvice, getAdvice, handleLikedClick, handleDislikedClick}) => {
    const {advice, liked, disliked} = selectedAdvice;

    const addClass = () => {
        if (liked) return "liked";
        else if (disliked) return "disliked";
        else return "";
    }
    return (
        <div className="advice">
            <header>
                <div className="btn-likes">
                    <button onClick={() => handleLikedClick({advice: advice, liked: true, disliked: false})}><FaRegThumbsUp className={liked ? 'active' : ''} /></button>
                    <button onClick={() => handleDislikedClick({advice: advice, liked: false, disliked: true})}><FaRegThumbsDown className={disliked ? 'active' : ''} /></button>
                </div>
            </header>
            <h1>{advice}</h1>
            <button onClick={() => getAdvice()}>Get me an advice!</button>
        </div>
    );
}
 
export default Advice;