import React, { useEffect, useReducer } from 'react';

const reducer = (state, action) => {
    if (action.type === "t") {
        return { ...state, x: !state.x };
    } else if (action.type === "u") {
        return { ...state, a: action.payload };
    } else if (action.type === "s") {
        return { ...state, s: action.payload };
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, { a: Array(9).fill(""), x: true, s: null });

    const click = (e) => {
        let co = [...state.a];
        if (win(co) || co[e]) return;
        else {
            co[e] = state.x ? "x" : "o";
            dispatch({ type: "u", payload: co });
            dispatch({ type: "t" });
        }
    };

    function win(sq) {
        const p = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2],
        ]
        for (let index = 0; index < p.length; index++) {
            const [x, y, z] = p[index]
            if (sq[x] && sq[x] === sq[y] && sq[x] == sq[z]) {
                return sq[x]
            }
        }
        return null
    }
    useEffect(() => {
        if (!win(state.a) && state.a.every((item) => item !== "")) {
            dispatch({ type: "s", payload: "match is draw plz restart" })
        }
        else if (win(state.a)) {
            dispatch({ type: "s", payload: `the winer is ${win(state.a)}` })

        }
        else {
            dispatch({ type: "s", payload: `next payer is  ${state.x ? "x" : "o"}` })

        }
    }, [state.x, state.a])
    function In({ value, onClick }) {
        return <button className='lkl' onClick={onClick}>{value}</button>;
    }

    return (
        <div className='cona'>
            <div>
                <In value={state.a[0]} onClick={() => click(0)} />
                <In value={state.a[1]} onClick={() => click(1)} />
                <In value={state.a[2]} onClick={() => click(2)} />
            </div>
            <div>
                <In value={state.a[3]} onClick={() => click(3)} />
                <In value={state.a[4]} onClick={() => click(4)} />
                <In value={state.a[5]} onClick={() => click(5)} />
            </div>
            <div>
                <In value={state.a[6]} onClick={() => click(6)} />
                <In value={state.a[7]} onClick={() => click(7)} />
                <In value={state.a[8]} onClick={() => click(8)} />
            </div>
            <h1>{state.s}</h1>
            <button className='lol' onClick={() => !win(state.a) && state.a.every((item) => item !== "") || win(state.a) ? (dispatch({ type: "t", payload: state.x }), dispatch({ type: "u", payload: Array(9).fill("") })) : alert("plz complate the match")}>restart</button>
        </div>
    );
};

export default App;
