
import { NotificationContext } from '../../components/Notification/NotificationContext';
import { useSafeContext } from '../../hooks/useSafeContext';

const Home = () => {
  const { addNoti } = useSafeContext(NotificationContext);

  const handleClickAddNotification = () => {
    addNoti({ id: 1, title: '첫 노티', type: 'success' });
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClickAddNotification}>버튼</button>
    </div>
  );
};

export default Home;