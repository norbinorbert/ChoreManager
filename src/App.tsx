import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { HomePage } from './pages/HomePage';
import { ToDoList } from './pages/ToDoList';
import { ChoreDetailsPage } from './pages/ChoreDetailsPage';
import { NewChorePage } from './pages/NewChorePage';
import { UpdateChorePage } from './pages/UpdateChorePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chores" element={<ToDoList />} />
        <Route path="/chores/:id" element={<ChoreDetailsPage />} />
        <Route path="/chores/new" element={<NewChorePage />} />
        <Route path="/chores/edit/:id" element={<UpdateChorePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
