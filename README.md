# Project Articles app

## Description

The project is aimed at creating articles page using Angular and integrating with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). The application employs the usage of the NgRx store to store the retrieved data. The key features of the project include displaying the 10 most recent posts from the store on the Articles page with a default image, title, and truncated description. Additionally, each article is linked to an inner page where the full description is displayed. New articles can be added using a form. The pages are designed to be responsive, utilizing flexbox.

### Features

- Fetches data from the JSONPlaceholder API
- Utilizes NgRx store for data storage
- Responsive design with Flexbox
- Displays the latest 10 articles on the Articles page
- Provides a form for submitting new articles, with validations for the input fields

## Getting Started

### Installation

1. Clone the repository.
2. Run `npm install` to install the project dependencies.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Usage

- Upon launching the application, the Articles page will display the 10 most recent articles.
- Clicking on an article will direct the user to an inner page displaying the full article.
- To create a new article, click on "Create article" button and navigate to the "Create Article" page. Fill out the form and click "Add".

## Possible imporvements

- More extensive testing.
- Better naming of variables.

## Author

[augustej](https://augustej.github.io/)
