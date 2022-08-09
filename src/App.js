import { useEffect, useState } from 'react';
import axios from 'axios';

import Advice from './Advice';

const App = () => {
    const [advice, setAdvice] = useState('');
    const [, setLikedAdvice] = useState(JSON.parse(localStorage.getItem('likedAdvice')) || []);
    const [, setDislikedAdvice] = useState(JSON.parse(localStorage.getItem('dislikedAdvice')) || []);

    useEffect(() => {
        getAdvice();
    }, []);

    const getAdvice = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then(response => checkHistoryAndSetAdvice(response.data.slip.advice))
                .catch(err => console.log(err))
    }

    const checkHistoryAndSetAdvice = (advice) => {
        const myLiked = JSON.parse(localStorage.getItem('likedAdvice')) || [];
        const myDisliked = JSON.parse(localStorage.getItem('dislikedAdvice')) || [];
        if (myLiked.includes(advice)) {
            setAdvice({advice: advice, liked: true, disliked: false});
        } else if (myDisliked.includes(advice)) {
            setAdvice({advice: advice, liked: false, disliked: true});
        } else {
            setAdvice({advice: advice, liked: false, disliked: false})
        }
    }

    const storeNewData = (name, data) => {
        const getStorage = JSON.parse(localStorage.getItem(name));
        if (!getStorage) {
            localStorage.setItem(name, JSON.stringify([data]));
            return;
        }
        getStorage.push(data);
        // console.log(getStorage);
        localStorage.setItem(name, JSON.stringify(getStorage));
    }

    const removeNewData = (name, data) => {
        const getStorage = JSON.parse(localStorage.getItem(name));
        if (!getStorage) {
            localStorage.setItem(name, JSON.stringify([]));
            return;
        }
        const updatedStorage = getStorage.filter((value) => value !== data);
        localStorage.setItem(name, JSON.stringify(updatedStorage));
    }

    const checkAndStoreAdvice = (valueData, liked=true) => {
        if (liked) {
            removeNewData('dislikedAdvice', valueData);
            storeNewData('likedAdvice', valueData);
        } else {
            removeNewData('likedAdvice', valueData);
            storeNewData('dislikedAdvice', valueData);
        }
    }

    const handleLikedClick = (advice) => {
        setAdvice((prev) => ({...prev, liked: true, disliked: false}));
        checkAndStoreAdvice(advice.advice);
        setLikedAdvice((prev) => [...prev, advice]);
    }

    const handleDislikedClick = (advice) => {
        setAdvice((prev) => ({...prev, liked: false, disliked: true}))
        checkAndStoreAdvice(advice.advice, false);
        setDislikedAdvice((prev) => [...prev, advice]);
    }

    if (!advice) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <Advice selectedAdvice={advice} getAdvice={getAdvice}
            handleLikedClick={handleLikedClick} handleDislikedClick={handleDislikedClick} />
        </>
        
    );
}
 
export default App;