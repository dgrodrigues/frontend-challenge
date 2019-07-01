## Requirements

Node 8
NPM 5.2+


## How To Run

To run the application, navigate to `/movies` in the terminal and run `npm install`. This will create the `node_modules` folder. After the installation finishes, run `npm start`. The project can be accessed by open `http://localhost:3000/` in browser.

To create a production like environment run `npm run build`. This will create a new folder called `build`, that can be served in a server.


## How it was created

This project was created using creat-react-app boilerplate (`npx create-react-app movies`). It uses multiple open source libraries to ease and simplify the developer's work, like fetch polyfill, node-sass, react and other dependencies of the project.

It contains two different pages. The homepage, with a search bar, a placeholder (that shows API errors if they appear) and a list of movies, fetched by page, with a 'load more' button.

The movie detail page, based on imdb id to get specific information, with ratings and option to add movies to a list of favorites, saved using web LocalStorage. 

Since this project is a single page application, it's possible to navigate to the homepage, from the detail page, and still keep the previous search results.

For styling, SASS was used, only for personal preference. Different approaches could've been used for file structure or more advanced SASS features like variables, but for the size and simplicity of the project i opted for a simpler approach.