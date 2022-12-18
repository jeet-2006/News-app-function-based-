import React, { useState } from 'react'
import Navbar from './Componants/Navbar';
import News from './Componants/News';
import LoadingBar from 'react-top-loading-bar'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(0);
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          height={3}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='general' country='in' pageSize={pageSize} category='general' />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' country='in' pageSize={pageSize} category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' country='in' pageSize={pageSize} category='entertainment' />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key='general' country='in' pageSize={pageSize} category='general' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key='health' country='in' pageSize={pageSize} category='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key='science' country='in' pageSize={pageSize} category='science' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports' country='in' pageSize={pageSize} category='sports' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key='technology' country='in' pageSize={pageSize} category='technology' />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App;