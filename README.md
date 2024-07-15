Project name:

Around The U.S.

### Overview  

* Intro  
* Figma, grids and media inquiries
* Images  
* Future ideas
  
**Intro**
  
This project is a kind of social media repository prototype that displays a profile and accompanying grid of pictures that users can like, all framed as part of a pseudo-journalistic, "journey across the U.S."; it's made so all the elements are displayed correctly on popular screen sizes. (I.E. the grid shrinks to a single column to better fit mobile devices and some of the header content collapses into a centered column). This site currently displays properly/adapts to average monitors and the smallest phone resolutions. 

Since the last time I edited this README a lot has happened. The webpage now utilizes object classes in compliance with OOP principles and now also has API support- every bit of info on the page- the name and description, profile pic, each card with their picture, titles and like status- gets sent to and stored on an external server which the page now readily makes requests to including deletions and additions of cards. Behind the scenes the source code has been chunked into a number of different sub-directories which all get processed through webpack, serving the source code in a format readily digestible by virtually every browser.
  
**Figma** was an important layout technology used to block and plan the project. The implementation of **grids** and **media inquiries** were crucial in getting a proper responsive design.  
  
* [Link to the project on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)  
  
**Images** were drawn both from a pre-existing directory, (for the higher quality "landscape photos,") and from extracting out of figma itself. (For the iconography where fidelity wasn't as important as per png's and vector files.) This is just for the, 'starter,' photos, however- the user can determine exactly what photos fill the gallery now, assuming their URL's they provide are valid. (Better hope they are in the public domain!)

**API** An acronym I just can't get into memory- Application Programming Interface. This webpage now interacts with a server set up by Tripleten which will provide the data needed to instantiate the gallery and update any information provided from the user. 

**OOP** Object Oriented Programming. The source code has been structured in a way that has several loosely coupled modules that take specific inputs who then control and have domain over certain aspects of the webpage- the various popups, each individual card, profile info, all of it has a self-contained object class responsible for how it behaves. These classes often draw upon each other and employ modified versions of each other's methods. (Encapsulation, Inheritance, and Polymorphism).

**Webpack** Do you remember that scene in the Matrix where Neo eats, 'real,' food for the first time on the ship and it's disgusting slop that contains the bare-bones nutrients the humand body needs to survive? I kind of think of Webpack the same way- it takes my messy source code, (which contains who knows what features I am taking advantage of that browsers x y and z may or may not support,) and produces a minified version that any browser can utilize, even deploying features it, (the browser,) doesn't natively support.

**Future ideas** would primarily revolve around expanding the responsiveness of the site to a wider variety of screen sizes to ensure a consistent smooth experience across devices. There's probably more that can be done with an API. Would like to add a music widget in the corner and hidden/bonus functionality modules like a hidden credits section or bonus links, something to spice up the page for engagement purposes. Site animations would be a nice touch too.

https://captaintastyshakes.github.io/se_project_aroundtheus/index.html 
-MJ
