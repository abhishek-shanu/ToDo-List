import React from 'react';
import ToDo from './Components/ToDo';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.app}>
        <ToDo/>
    </div>
  );
}

export default App;
