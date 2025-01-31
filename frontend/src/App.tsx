import './theme/index.css';
import './theme/reset.css';

import { NotificationProvider } from './components/Notification/NotificationProvider';
import Home from './pages/Home';

const App = () => (
  <NotificationProvider>
    <Home />
  </NotificationProvider>
);

export default App;
