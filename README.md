# 🧠 Interactive Digital Bulletin Board

A web-based **interactive bulletin board** where users can create, move and manage different types of cards such as notes, to-do lists, galleries, timers, calculators and more.
This project was built as an **innovation project** with a focus on usability, modularity and experimentation.

## Project Overview

This application allows users to create one or multiple boards and freely place cards on them, similar to a digital pinboard.
Each card type has its own functionality and state, and boards are persisted using **localStorage**, so content is not lost on refresh.

The project is built using:

- React
- Vite
- Tailwind CSS

Key features:
- Multiple boards
- Draggable cards
- Different card types (Notes, To-Do, Gallery, Timer, Calculator, Weather, etc.)
- Board backgrounds (color or image)
- Persistent state using localStorage

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/decoolesabri/innovatieproject-sabri.git
   ```
2. Navigate into the project folder:
   ```bash
   cd innovatieproject-sabri
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser:
   ```bash
   http://localhost:5173
   ```

## Usage
- Use the Card Picker to add new cards to the board
- Drag cards freely across the board
- Each card has its own functionality:
- NoteCard – simple text notes
- ToDoCard – tasks with completion and priority
- GalleryCard – upload and display images
- TimerCard – countdown timer
- CalculatorCard – basic calculator
- WeatherCard – weather information
- Boards and cards are automatically saved in localStorage
- Change the board background using the background controls
Refreshing the page will not remove your data.

## Project structure

```
src/
├── components/
│   ├── Board.jsx
│   ├── CardPicker.jsx
│   └── Card/
│       ├── BaseCard.jsx
│       ├── NoteCard.jsx
│       ├── ToDoCard.jsx
│       ├── GalleryCard.jsx
│       └── ...
├── App.jsx
├── main.jsx
└── index.css
```

## Roadmap

Based on experimentation and feedback during development, the following improvements are planned or considered for the future:
- Dark mode – Full theme support using Tailwind CSS
- Card locking / pinning – Prevent accidental movement of important cards
- Resizing cards – Make selected cards resizable
- Improved mobile support – Better usability on smaller screens
- Export / import boards – Save boards as JSON files
- User accounts – Sync boards across devices

These features are not required for the current innovation project, but would make the application more complete and scalable.
The most important improvements are listed at the top.
