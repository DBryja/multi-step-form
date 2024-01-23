# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Instructions](#instructions)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
- [Author](#author)

## Instructions

After downloading the project open the terminal and run:

- Installing node modules:

  - npm install

- Running developer version

  - npm run start

- Running production version
  - npm run build
    - serve -s build //run static server using production version
    - npm run eject //delete the production version

## My process

### Built with

- Mobile-first workflow
- [TypeScript](https://www.typescriptlang.org/) - JS language extension
- [React](https://reactjs.org/) - JS library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [ReactHookForm](https://react-hook-form.com/) - React Hook

### Continued development

I'm not really glad of the outcome.
There is a lot of place for improvement, as I have added the react-hook-form in the middle of development, my project is not written with this feature in mind, thus this results in combination of two methods - state managment for storing data and updating fields and react-hook-form only for validation, lowering the performence.
I should replace current(state managment) input subscription with "watch" tool, which decreases the amount of components rerendering, what would significantly increase the efficiency.

## Author
- [GitHub](https://github.com/DBryja/) DBryja
- [LinkedIn](https://www.linkedin.com/in/dawid-bryja-898134249/) Dawid Bryja
    
    
