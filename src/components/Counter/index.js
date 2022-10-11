import { useState } from "react";

const Counter = ({stock, updateQty}) => {
    const [counter, setCounter] = useState(0);

    const handleClick = (qty) => {
        if (counter + qty < 0) return
        if (counter + qty > stock) return
        
        setCounter(counter + qty);
        updateQty(counter + qty)
    }
    return (
        <div className="flex items-center gap-2.5">
            <button onClick={() => handleClick(-1)} className="flex ml-auto text-white bg-indigo-900/[.5] border-0 px-1 focus:outline-none hover:bg-indigo-600 rounded">⬅</button>
            <p>{counter}</p>
            <button onClick={() => handleClick(+1)} className="flex ml-auto text-white bg-indigo-900/[.5] border-0 px-1 focus:outline-none hover:bg-indigo-600 rounded">➡</button>
        </div>
    );
};

export default Counter;
