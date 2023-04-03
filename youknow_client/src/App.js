import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import DataTable from './components/DataTable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/data' element={<DataTable />} />
            </Routes>
          </div>
        </LocalizationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
