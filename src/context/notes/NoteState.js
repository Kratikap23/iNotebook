import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState=({children})=> {
    const initialState = {
        "name": "Kratika",
        "class": "10b"
    };
    const [state, setState] =  useState(initialState);
    const update = () => {
        setTimeout(()=>{
            setState({
                "name": "Patidar",
                "class": "5b"
            })
        },1000);
    }
    return (
        <NoteContext.Provider  value = {{state, update}}>
            {children}
        </NoteContext.Provider>
    )
}


export default NoteState;