import { useState, createContext, useEffect } from 'react';
export const ShortlistContext = createContext();

export default function ShortlistContextProvider(props){
    const [shortlist, setShortlist] = useState(() => {
        const storedShortlist = localStorage.getItem('shortlist');
        return storedShortlist ? JSON.parse(storedShortlist) : [];
      });

useEffect(()=>{
    const storedShortlist = localStorage.getItem('shortlistItem')
    if (storedShortlist){
        setShortlist(JSON.parse(storedShortlist))
    }
}, [])

useEffect(()=>{
    console.log('update, shortlist is', shortlist)
    localStorage.setItem('shortlist', JSON.stringify(shortlist))
}, [shortlist]
)

const addShortlist = (shortlistToAdd) =>{
    console.log('adding', shortlistToAdd)
    let newShortlist = [...shortlist, shortlistToAdd]
    setShortlist(newShortlist)
    localStorage.setItem('shortlist', JSON.stringify(newShortlist))
}

const removeShortlist = (shortlistToRemove) =>{
    console.log('removing', shortlistToRemove)
    let newShortlist = shortlist.filter(item => item !== shortlistToRemove);
    setShortlist(newShortlist)
    localStorage.setItem('shortlist', JSON.stringify(newShortlist))
}

return(
    <ShortlistContext.Provider value={{ shortlist, addShortlist, removeShortlist }} >
        {props.children}
    </ShortlistContext.Provider>
)

}
