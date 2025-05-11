import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import QuizPage from "./pages/QuizPage/QuizPage";
import WordList from "./components/WordList/WordList";

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 p-4 text-white">
        <Link to="/" className="mr-4 hover:underline">
          Add Words
        </Link>
        <Link to="/quiz" className="mr-4 hover:underline">
          Quiz
        </Link>
        <Link to="/word-list" className="hover:underline">
          Word List
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/word-list" element={<WordList />} />
      </Routes>
    </Router>
  );
}

export default App;
