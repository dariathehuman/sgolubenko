# 🧑🏻‍🚀🧑🏻‍⚖️ sgolubenko - personal website

## Requirements

* [Node.js >= v.13 (with npm)](https://nodejs.org/en/)
* [Gulp](https://www.npmjs.com/package/gulp)

## Open website

[Click here](https://sgolubenko.ru)

## Installation 

Get the repo onto your local machine (or download zip)

Install npm packages:

```bash
$ npm i
```

Start working:

```bash
$ gulp
```
Make a production build

```bash
$ gulp build
```

## Project structure
```
├── gulpfile.js/                      # Config Gulp.js
├── source/                           # Developing folder
    ├── articles                      # Folder with articles from services block in html
    ├── assets                        # Folder with ready styles, images and fonts
        ├── css
            ├── style.min.css   
        ├── fonts
        ├── images
    ├── fonts                         # Folder for fonts (woff/woff2)
    ├── images
        ├── icons                     # Going to sprite.svg via $ gulp sprite
    ├── blog                          # Folder with articles from blog in html
    ├── layout                        # Dev folder with all components in twig
        ├── articles                      
        ├── blog
        ├── blog-page
        ├── components
        ├── error-page
        ├── main-page 
    ├── js
        ├── min                      
        ├── libs.min.js
        ├── main.js
    ├── scss
        ├── colors.scss              # Variables for colors
        ├── extra.scss               # For global styles
        ├── fonts.scss               # Turning on fonts
        ├── grid.scss                # Turning on grid styles
        ├── libs.scss                # Turning on styles libs
        ├── media.scss               # For media mixin
        ├── media.scss               # For spaces mixin
        ├── style.scss               # Importing all style files
        ├── -section-.scss           # Styles for section
│   └── index.html and other main pages
├── .gitignore                       # List of gitignore files
├── package.json                     # Config file
├── package-lock.json                # Config file
└── README.md                        # Documentation
