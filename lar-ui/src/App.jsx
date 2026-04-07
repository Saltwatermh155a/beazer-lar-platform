import Navbar from './components/nav/Navbar';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BasicTabs from './components/Tabs';
import PresidentsLetter from './pages/presidentsLetter/PresidentsLetter';
import LetterEditor from './pages/letterEditor/LetterEditor';
import HomePage from './pages/home/HomePage';
import TopInputForm from './pages/topinputform/TopInputForm';
import TopOutput from './pages/topoutput/TopOutput';
import LarCriteria from './pages/larCriteria/LarCriteria';
import Proforma from './pages/proforma/Proforma';
import LARPlatformPOC from './pages/LARPlatformPOC';
import './App.css';

function App() {
  return (
    <div className='overflow-x-hidden'>
      <Router>
        {/* Define routes for different pages */}
        <Routes>
          {/* POC route — standalone, no navbar/tabs overlay */}
          <Route path="/poc" exact element={<LARPlatformPOC />} />

          {/* Existing routes with navbar */}
          <Route path="*" element={
            <>
              <Navbar />
              <BasicTabs />
              <Routes>
                <Route path="/" exact element={<Navigate to="/poc" replace />} />
                <Route path="/presidents-letter" exact element={<PresidentsLetter />} />
                <Route path="/letter-editor" exact element={<LetterEditor />} />
                <Route path="/home" exact element={<HomePage />} />
                <Route path="/topinputform" exact element={<TopInputForm />} />
                <Route path="/topoutput" exact element={<TopOutput />} />
                <Route path="/larcriteria" exact element={<LarCriteria />} />
                <Route path="/proforma" exact element={<Proforma />} />
              </Routes>
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
