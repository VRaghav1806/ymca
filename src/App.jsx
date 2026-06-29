import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import './styles/globals.css';

function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
      <Layout />
    </>
  );
}

export default App;
