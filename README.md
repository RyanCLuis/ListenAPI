# ListenAPI

- This is an API I am creating for my Listen app (https://github.com/RyanCLuis/Listen)

## Entities

```js
User is comprised of the following:

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    token: String,
```
```js
Podcast is comprised of the following:

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        default: [],
    },
    type: {
        type: String,
        default: "audio",
    },
    category: {
        type: String,
        default: "comedy",
    },
    views: {
        type: Number,
        default: 0,
    },
    episodes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Episodes",
        default: [],
    }
},
    {
        timestamps: true,
    }
);

```
```js
Episode is comprised of the following:

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "audio",
    },
    duration: {
        type: String,
        default: "",
    },
    file: {
        type: String,
        default: "",
    },
},
    { timestamps: true,
     }
);
```


### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |


### Podcast

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/`                    | `podcast#create`  |
| GET    | `/`                    | `podcast#index`   |
| GET    | `/:id`                 | `podcast#show`    |
| PATCH  | `/:id`                 | `podcast#update`  |
| DELETE | `/:id`                 | `podcast#delete`  |

### Searches

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/search/mostpopular`  | `mostpopular#index`|
| GET    | `/search/tags`         | `tags#index`      |
| GET    | `/search/:catagory`    | `catagory#index`  |
| GET    | `/search`              | `search#index`    |


