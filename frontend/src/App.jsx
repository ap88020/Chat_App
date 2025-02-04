import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { UserProvider } from './context/user.context';

function App() {
  return (
    // Wrapping the application with UserProvider to provide global state
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
