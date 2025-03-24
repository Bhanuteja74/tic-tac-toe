# Tic-Tac-Toe Game

## Introduction

I built this game to understand the Model-View-Control (MVC) pattern by separating the model and frontend controls. It also helped me practice JavaScript classes and event handling.

## Demo

I have hosted the game on GitHub Pages.

- **Code Repository:** [GitHub Repo](git@github.com:Bhanuteja74/tic-tac-toe.git)
- **Live Game:** [Play Here](https://bhanuteja74.github.io/tic-tac-toe/)

This is a public repository, so anyone can clone and explore the code.

## Clone the Repository

To clone this project, run the following command:

```sh
git clone git@github.com:Bhanuteja74/tic-tac-toe.git
```

## Project Structure

```
├── css
│   └── style.css       # Styles for the game
├── favicon.ico         # Favicon for the game
├── game.js             # Main game logic
├── index.html          # Main HTML file
├── js
│   ├── players.js      # Player management logic
│   └── tic-tac-toe.js  # Core Tic-Tac-Toe logic
└── serve.js            # Server file to run the game
```

## How to Run

### Using the Provided Server

1. Run the `serve.js` file using Deno.
   ```sh
   deno run --allow-net serve.js
   ```
2. Open your browser and go to `http://localhost:8000`.

### Running with Your Own Server

If you prefer, you can use any local server to serve the files.

**Using Python:**

```sh
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Features

- Classic Tic-Tac-Toe gameplay
- Two-player mode
- Undo feature
- Restart option
- Simple and clean UI

## Requirements

- A modern web browser
- Deno (if using `serve.js`)

## License

This project is open-source and free to use.
