# The Project

This project is implemented for the recruiting processs for a front-end developer position at Umbraco. It is a simple Umbraco Heartcore powered blog, with the following instructions:

_We want you to create a relatively simple blog for Umbraco.com. The source code needs to be put into a Github repository – this is how we will be reviewing your submission._

_You will be creating the frontend for the blog. The backend will be running Umbraco Heartcore and you will be invited to the project . You can use any technology of your choosing for the frontend such as ASP.NET Core Razor Pages or a single page application solution with VueJS, React or something else. It’s also up to you if you want to use Umbraco Heartcore’s content delivery API or GraphQL to fetch the content._

## Requirements

- _Make a frontend application powered by content from an Umbraco Heartcore site_
- _Host the source code on a Github repository. Make sure to have a readme.md file which instructs other people how to run the application locally._
- _The layout must be split into three sections:_
  **Header:** Should display the logo and the dynamic navigation provided in the backend’s Home page. On the frontend it should be possible to click on any of the links in the navigation and see the content of those pages
  **Main:** Should display the content of the current page
  **Footer:** Should display a simple copyright message
- _The home page should display a list of blog posts. Clicking any of these should open the blog post on another page_

_You are welcome to create all the HTML and CSS yourself, use a framework such as Bootstrap or Bulma or find a prebuilt blog theme somewhere on the internet._

## Programming Languages and Frameworks

- I decided to use [`Next.js](https://nextjs.org/), bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- The code is written in JavaScript.
- I use css modules and scss for the styles.
- Animations are implemented using GSAP.

## Getting Started

To run the development server, run the following commands in the root of the project:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is deployed using the [Vercel] (https://vercel.com/) platform, from the creators of Next.js.

To see the latest version of the website, click [here.] (https://umbraco-recruiting-homework.vercel.app/)
