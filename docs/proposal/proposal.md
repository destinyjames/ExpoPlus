# School of Computing &mdash; Year 4 Project Proposal Form

> Edit (then commit and push) this document to complete your proposal form.
> Make use of figures / diagrams where appropriate.
>
> Do not rename this file.

## SECTION A

|                     |                   |
|---------------------|-------------------|
|Project Title:       | EXPO +            |
|Student 1 Name:      | Genesis Uwumangbe |
|Student 1 ID:        | 20459666          |
|Student 2 Name:      | Gideon Amaechi    |
|Student 2 ID:        | 20364806          |
|Project Supervisor:  |Dr. Darragh O’Brien|

App link: https://react-8ha4botqu-destinys-projects-a3dc80e8.vercel.app/

## SECTION B


### Introduction
A web application which is designed for the DCU expo event where projects are showcased by students to attendees. This application will allow for easy navigation of the event and make it easier and quicker for attendees to find projects that they are interested in and communicate with students. We plan on making it available to use on all devices which have access to the web.


### Outline

Our project is a web application which would replace or supplement the current project booklet and would allow Expo attendees to easily find where project demos are located, EXPO+ provides a more interactive and modern feel to the event making life much easier than flicking through pages to find project demos you would be interested in. This application will be available for all devices with browsers. Users will be able to log in with their DCU accounts as well as can create an account if they don't have one. Attendees will be greeted with our machine learning algorithm. This algorithm will ask the users various questions before showcasing the projects and their location in the lab. We will test their algorithm on publicly available datasets e.g. movies from kaggle
These questions will be:

What program of study? - This will allow attendees to view projects based on what the students are studying e.g Computer Applications, Data Science etc. we will also include data from engineering courses.


What project area? This will ask if the attendee would like to see machine learning, natural language processing etc.



We plan on having an easy navigation system where the attendees will be given an interactive map to the labs. We will be using a java script library called Leaflet.js to create this. Users will have access to a sped up video walk through from the entrance of the building to each room that the expo will be held

We will hold our data on MongoDB and make use of its PyMongo library.

The attendees will be able to leave feedback to students as well as communicate with them with our chat feature which will collect the user's message and send it to the email address of the students for this we will be using the sendgrid API.

We will have a feature where the attendees can like students' projects and this will then feed into our algorithm where you can filter for the most popular projects.


### Background

We came up with this idea with a lecturer that mentioned that our college doesn't have an application for the expo. We also acknowledged that attendees might have a hard time locating which page to be on in the expo booklet. This will lead to them wasting time locating projects they are interested in and will end up missing out on the projects they are actually interested in as they may have to leave early or may be lost. We also want to limit the number of books being used as it will be good for our environment.

We will have a section where users of the application can leave some feedback for us. They can let us know if they would like any changes to the web application

### Achievements

Features

User sign-in - Users will be able to sign in with their DCU account or they can create their account.

User Profile - User will be able to edit their profile and enter where they come from and enter their linkedin username also.

Machine learning recommender system- This system will ask attendees some questions then filter out the projects it recommends the attendee to visit based on the choices we will also implement collaborative filtering to recommend projects to users of similar interest e.g. visitors X and Y are both interested in ML, X thinks project P is excellent so P is recommended to Y as worth visiting this system will also look at projects that X has liked and will be part of the recommendation to Y. To validate this recommendation system we will test the algorithm with publicly available datasets e.g movies from kaggle, this will alleviate reviewer's concerns about a cold start recommender


Interactive map - this map will allow users to interact with it and view where each student will be for the expo. User will be able to star all the projects they wish to visit and on the map of the lab it will highlight the exact location of the student. We have access to the layout of the buildings and labs from the expo booklet we will use these designs as a guideline.

Comment section - attendees can leave a public comment under a students project and give feedback publicly.


Search function- attendees can search for a particular keyword or user and projects will be listed

Review - attendees will be able to drop a review to us creators on what they think about the application or if they think of any changes.

Like function - attendees can like students projects this feature will be used to show the most popular projects if the attendee wants to filter to that section

star function - user will be able to star the projects that they would like to visit. once done they will be brought to a page where all the starred projects are and user can view the location for each starred project.

**Optional Features**

Chat feature - attendees will be able to contact students and give them feedback on their project if they weren't able to make the expo or didn't have enough time to talk to the students

Routing mechanism on map - We have looked into routing and identified the A* algorithm as a possibility. and would be implemented if we have enough time


### Justification

This application will be useful for people who don't have too much time on their hands and would like to access information faster than flipping through pages on a booklet.

Its mainly used for the expo event held in dcu and will complement the booklet. This app can also be used outside the expo event.

It will also help attendees locate where students are in the labs

### Programming language(s)

Python
JavaScript

### Programming tools / Tech stack

Backend - Flask
Frontend- ReactJS, HTML/CSS
Database - MongoDB
Vercel - Hosting/Deploying


### Learning Challenges

One of our challenges would be to impliment a machine learning algorithm to our project.
We both have not used the Flask framework before so its very new to us as we have always been using Django. We both do not have much experience with ReactJS and using the Mongo DB so everything is pretty much new and a challenge. We have never deployed on a server before so it would be quite interesting to integrate this into our project.


### Breakdown of work
Student 1 will work on the backend using flask and frontend code using react
Student 2 will help with the backend, data handling and testing.

Both of us will be responsible for implementation and maintaining the CI/CD pipeline, ensuring efficient code integration and deployment.

### Student 1
Functional spec,
Technical documentation,
Video walkthrough,


### Student 2
Functional spec, 
User guide,
Ethics approval,
Testing



<p align="center">
  <img src="./res/cat.png" width="300px">
</p>

