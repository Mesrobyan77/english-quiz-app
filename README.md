English-Armenian Translation Quiz

A beautifully designed, responsive React application for learning English and Armenian vocabulary through an interactive translation quiz. Features include speech synthesis, animated feedback, confetti celebrations, particle backgrounds, and sound effects for an engaging user experience.
📖 Table of Contents

Features
Demo
Installation
Usage
Project Structure
Dependencies
Scripts
Contributing
License

✨ Features

Interactive Quiz: Translate words between English and Armenian with real-time feedback.
Speech Synthesis: Listen to word pronunciations using the Web Speech API.
Responsive Design: Optimized for mobile, tablet, and desktop with fluid layouts.
Animations: Smooth transitions, slide-ins, and bounce effects for a lively UI.
Confetti Celebration: Visual rewards for correct answers using canvas-confetti.
Particle Background: Dynamic, interactive particles via @tsparticles/react.
Sound Effects: Audio feedback for correct/incorrect answers (requires correct.mp3 and incorrect.mp3).
Customizable Settings:
Speech rate and voice selection.
Sound volume control and toggle.


Local Storage: Persists user settings and word list.
Routing: Built with react-router-dom for potential multi-page navigation.

🎥 Demo
[Insert a link to a live demo or screenshot here, e.g., hosted on Netlify/Vercel]

🛠 Installation
Follow these steps to set up the project locally:

Clone the repository:
git clone https://github.com/mesrobyan77/english-quiz-app.git
cd english-quiz-app


Install dependencies:
npm install


Add sound files (optional, for sound effects):

Place correct.mp3 and incorrect.mp3 in the public/sounds/ folder.
Source free sound effects from Freesound.org or similar.


Start the development server:
npm start

The app will open at http://localhost:3000.


🚀 Usage

Add Words:

The app uses a word list stored in localStorage under the key "words".
Example format:[
  { "id": "1", "english": "hello", "translated": "բարեւ" },
  { "id": "2", "english": "world", "translated": "աշխարհ" }
]


Use a separate component or manually set via localStorage.setItem("words", JSON.stringify([...])).


Play the Quiz:

Select translation direction (English → Armenian or Armenian → English).
Listen to words using the speaker icon (English only).
Enter translations and submit to receive feedback.
Correct answers trigger confetti and a sound effect; incorrect answers play a buzzer.
Adjust speech rate, voice, sound volume, or toggle sounds via settings.


Customize:

Modify Quiz.module.scss for different colors or animations.
Update particlesOptions in Quiz.js for custom particle effects.


Quiz.js: Core component with quiz logic, animations, and sound effects.
Quiz.module.scss: Responsive styles with animations and particle background.
public/sounds/: Stores audio files for correct/incorrect feedback.

📦 Dependencies
Key dependencies used in the project:

React 19.1.0: Frontend framework.
@tsparticles/react 3.0.0: Interactive particle backgrounds.
canvas-confetti 1.9.3: Confetti animations for correct answers.
sass 1.88.0: SCSS for styling.
react-router-dom 7.6.0: Routing (extendable for multi-page apps).
axios 1.9.0: For potential API integrations.
nanoid 5.1.5: Unique ID generation for words.

Dev dependencies include testing libraries (@testing-library/*) and prettier for code formatting.
See package.json for the full list.
📜 Scripts

npm start: Runs the app in development mode.
npm build: Builds the app for production.
npm test: Runs tests with Jest.
npm eject: Ejects from Create React App (use with caution).
npm format: Formats code with Prettier.

🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

Please ensure code is formatted with Prettier (npm format) and passes tests (npm test).
📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

Built with ❤️ by Mesrobyan77. Happy learning!
