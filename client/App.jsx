import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Editor from './components/Editor';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='editor' element={<Editor />}></Route>
      </Routes>
    </>
  );
}
