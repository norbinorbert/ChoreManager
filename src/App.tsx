import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { HomePage } from './components/Home';
import { ToDoList } from './components/ToDoList';
import { ChoreDetails } from './components/ChoreDetails';
import { NewChore } from './components/NewChore';
import { UpdateChore } from './components/UpdateChore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chores" element={<ToDoList />} />
        <Route path="/chores/:id" element={<ChoreDetails />} />
        <Route path="/chores/new" element={<NewChore />} />
        <Route path="/chores/edit/:id" element={<UpdateChore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
