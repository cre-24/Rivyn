# Image Gallery Web App

This project is a simple web-based image gallery built with Go and HTML templates. It dynamically loads image data from JSON files and displays them in a responsive grid layout. The gallery features clickable images that can be enlarged in an overlay for better viewing. Static assets such as CSS and JavaScript are used to enhance the user experience and provide interactive functionality.

## Features
- Responsive image grid layout
- Dynamic loading of image data from JSON
- Click-to-enlarge images with overlay
- Clean separation of static assets and backend logic
- Easily extensible for additional galleries or features

## Technologies Used
- Go (net/http, html/template)
- HTML5 & CSS3
- JavaScript

## Getting Started
1. Run the Go server to start the web application.
2. Open your browser and navigate to the provided local address.
3. Browse the gallery and click images to view them in full size.

## Folder Structure
- `main.go` (server logic)
- `index.html` (template)
- `style.css` (styling)
- `main.js` (client-side scripts)
- `galleries/` (JSON data for galleries)

## Customization
You can add new galleries by creating additional JSON files in the `galleries` folder and updating the server logic to load them as needed.
