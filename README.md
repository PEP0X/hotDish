# Hot Dish 🥘

## Overview

Hot Dish is a web application designed to provide users with a delightful experience of exploring various meal recipes. The application features a responsive design, interactive navigation, and dynamic content fetching from an external API.

## Features

- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across different devices.
- **Dynamic Content**: Fetches and displays meal data from the [TheMealDB API](https://www.themealdb.com/api.php).
- **Interactive Navigation**: Collapsible side navigation menu with smooth animations.
- **Search Functionality**: Allows users to search for meals by name or first letter.
- **Category and Area Filters**: Users can filter meals by categories and areas.
- **Contact Form**: A contact form with validation and local storage functionality.

## Technologies Used

- **HTML**
- **CSS**
  - Tailwind CSS
  - DaisyUI
- **JavaScript**
  - jQuery
- **API**
  - TheMealDB API

## Function Explanations

### `main.js`

- **Loading Events**: Handles the initial loading animations and fetches meals.
- **Nav Collapse & Arrow Change**: Manages the collapsible side navigation menu.
- **Search Functionality**: Implements the search functionality for meals.
- **Navigation Click Events**: Handles click events for navigation items to fetch and display categories, areas, and ingredients.
- **Display Functions**: Functions to display meals, categories, and areas.
- **Contact Form**: Implements the contact form with validation and local storage.

### `tailwind.config.js`

- **Theme Configuration**: Extends the default Tailwind CSS theme with custom fonts and colors.
- **Plugins**: Includes DaisyUI for additional UI components.

### `main.css`

- **Base Styles**: Imports Google Fonts and Tailwind CSS base styles.
- **Custom Styles**: Defines custom styles for the application, including responsive design and utility classes.

## Contributing

We welcome contributions to improve Hot Dish. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Thank you for using Hot Dish! Enjoy exploring delicious recipes! 🍽️
