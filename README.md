# Pokemon-M2-Project
## Description

the project is a website where you can create your own Pokedex by adding originals or custom pokemon
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 

- **homepage** - As a user I want to be able to access the homepage so that I can login and signup
- **sign up** - As a user I want to sign up on the webpage 
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **pokedex** - As a user I want to see all the pokemon available
- **pokemon create** - As a user I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see more info about the pokemon and be able to post a comment


## Backlog

List of other features outside of the MVPs scope

User profile:
- create a game where you can capture the pokemon
- add more info on the profile page
- upload my profile picture
- see other users profile




## ROUTES:

- GET / 
  - renders the homepage
- GET /signup
  - renders the signup form 
- POST /signup
  - redirects to / if user logged in
  - body:
    - username
    - password
- GET /login
  - redirects to /main after successful login
  - renders the login form
- POST /login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /logout
  - body: (empty)

- GET /create
  - renders the the create form
- POST /create 
 
  - body: 
    - name
    - img
    - type
    - ability
- GET /pokedex
  - renders the all the pokemon

- GET /:pokemonId
  - renders a selected pokemon

- GET /update/:pokemonId
  - renders the update form

- POST /update/:pokemonId
  - body: 
    - name
    - img
    - type
    - ability

- POST /delete/:pokemonId
  - delete a pokemon

- POST /:pokemonId
  - create a comment




## Models

User model
 
```
username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
```

Pokemon model

```
name: String,
    img: String,
    type: [
      {
        type: String,
        enum: [
          "Bug",
          "Dark",
          "Dragon",
          "Electric",
          "Fairy",
          "Fighting",
          "Fire",
          "Flying",
          "Ghost",
          "Grass",
          "Ground",
          "Ice",
          "Normal",
          "Poison",
          "Psychic",
          "Rock",
          "Steel",
          "Water",
        ],
        required: true,
      },
    ],
    ability: {
      type: String,
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
``` 
Comment model

``` 
content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  pokemon: {
    type: Schema.Types.ObjectId,
    ref: "Pokemon",
  },

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
``` 


## Links

### Trello

[Link trello board](https://trello.com/b/wTNiF4AQ/pokemon-m2-project) 

### Git

[Repository Link](https://github.com/ncontin/Pokemon-M2-Project.git#main)

[Deploy Link](https://pokemon-project-m2.adaptable.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1rZ4KbJ_qn9uSzrvivhI3aBeniQwbaa_vbwrdXcfOQlM/edit#slide=id.g23e6d134057_0_557)
