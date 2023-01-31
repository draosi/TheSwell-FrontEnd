import './App.css';
import { TheSwellContext } from './context/TheSwellContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const { value1, value2, value3, value4 } = useContext(TheSwellContext)
  const [surfData, setSurfData] = value1;
  console.log(surfData)

  console.log(surfData)

  return (
    <div className="App">
    {/* {surfData.map((e,i) => {
      return(
        <div key={i}>
        <p>{e}</p>
        </div>
      )
    })} */}
    </div>
  );
}

export default App;
