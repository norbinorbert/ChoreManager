import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { HomePage } from './pages/HomePage';
import { ToDoList } from './pages/ToDoList';
import { ChoreDetailsPage } from './pages/ChoreDetailsPage';
import { NewChorePage } from './pages/NewChorePage';
import { UpdateChorePage } from './pages/UpdateChorePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationBar } from './components/NavigationBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchInterval: 60000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chores" element={<ToDoList />} />
          <Route path="/chores/:id" element={<ChoreDetailsPage />} />
          <Route path="/chores/new" element={<NewChorePage />} />
          <Route path="/chores/:id/edit" element={<UpdateChorePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
