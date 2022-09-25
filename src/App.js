
import './App.css';
import AddQuiz from './components/Quiz/AddQuiz';
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <div className="App">
      <AddQuiz />

      <Toaster />
    </div>
  );
}

export default App;
