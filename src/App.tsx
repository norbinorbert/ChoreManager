import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useKeycloak } from '@react-keycloak/web';
import { HomePage } from './pages/HomePage';
import { ToDoList } from './pages/ToDoList';
import { ChoreDetailsPage } from './pages/ChoreDetailsPage';
import { NewChorePage } from './pages/NewChorePage';
import { UpdateChorePage } from './pages/UpdateChorePage';
import { NavigationBar } from './components/NavigationBar';
import { SubtasksPage } from './pages/SubtasksPage';
import { NewSubtaskPage } from './pages/NewSubtaskPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchInterval: 60000,
    },
  },
});

function App() {
  const { keycloak } = useKeycloak();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chores" element={<ToDoList />} />
          <Route path="/chores/:id" element={<ChoreDetailsPage />} />
          <Route path="/chores/new" element={keycloak.authenticated ? <NewChorePage /> : <UnauthorizedPage />} />
          <Route
            path="/chores/:id/edit"
            element={keycloak.authenticated ? <UpdateChorePage /> : <UnauthorizedPage />}
          />
          <Route path="/chores/:choreId/subtasks" element={<SubtasksPage />} />
          <Route
            path="/chores/:choreId/subtasks/new"
            element={keycloak.authenticated ? <NewSubtaskPage /> : <UnauthorizedPage />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
