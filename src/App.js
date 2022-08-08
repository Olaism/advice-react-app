import { useEffect, useState } from 'react';
import axios from 'axios';

import Advice from './Advice';

const App = () => {
    const [advice, setAdvice] = useState('');
    const [likedAdvice, setLikedAdvice] = useState([]);
    const [dislikedAdvice, setDislikedAdvice] = useState([]);

    useEffect(() => {
        getAdvice();
        getOrSetLikedAdvice();
        getOrSetDislikedAdvice();
    }, []);

    const getAdvice = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then(response => setAdvice({advice: response.data.slip.advice, liked: false, disliked: false}))
                .catch(err => console.log(err))
    }

    const getOrSetLikedAdvice = () => {
        const savedLikedAdvice = JSON.parse(localStorage.getItem('likedAdvice'));
        if (!savedLikedAdvice) {
            localStorage.setItem('likedAdvice', JSON.stringify(likedAdvice));
        }
        return savedLikedAdvice;
    }

    const getOrSetDislikedAdvice = () => {
        const savedDislikedAdvice = JSON.parse(localStorage.getItem('dislikedAdvice'));
        if (!savedDislikedAdvice) {
            localStorage.setItem('dislikedAdvice', JSON.stringify(dislikedAdvice));
        }
        return savedDislikedAdvice;
    }

    if (!advice) {
        return <h1>Loading...</h1>
    }

    const handleLikedClick = (advice) => {
        setAdvice((prev) => ({...prev, liked: true, disliked: false}));
        setLikedAdvice((prev) => [...prev, advice]);
        localStorage.setItem('likedAdvice', JSON.stringify(likedAdvice));
    }

    const handleDislikedClick = (advice) => {
        setAdvice((prev) => ({...prev, liked: false, disliked: true}))
        setDislikedAdvice((prev) => [...prev, advice]);
        localStorage.setItem('dislikedAdvice', dislikedAdvice);
    }

    return (
        <Advice selectedAdvice={advice} getAdvice={getAdvice}
        handleLikedClick={handleLikedClick} handleDislikedClick={handleDislikedClick} />
    );
}
 
export default App;