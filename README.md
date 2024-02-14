# ListenAPI

- This is an API I am creating for my Listen app (https://github.com/RyanCLuis/Listen)

## ERD

<img src="ERD p4.JPG">

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

### Episodes

| Verb   | URI Pattern                      | Controller#Action |
|--------|----------------------------------|-------------------|
| POST   | `/episodes/:podcastId`           | `episode#create`  |
| PATCH  | `/episodes/:podcastId/:episodeId`| `episode#update`  |
| DELETE | `/episodes/:podcastId/:episodeId`| `episode#delete`  |



