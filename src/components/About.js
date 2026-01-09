import React, { useEffect } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const About = () => {
  const a = useContext(noteContext)
  useEffect(()=> {
    a.update()
  },[a])
  return (
    <div>
      This is About {a.state.name} and She is in class {a.state.class}
    </div>
  )
}

export default About;
