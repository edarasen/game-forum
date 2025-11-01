
# Game Forum Project

Avion School Project : A game forum for Pluck & Brew, a game in development
- Front end : React Vite
- Back end API : Ruby on Rails
### Table of Contents
- [React External Dependencies](#react-external-dependencies)
- [Ruby on Rails External Dependencies](#ruby-on-rails-external-dependencies)
- [Environment Variables](#environment-variables)
- [Running the App Locally](#running-the-app-locally)
- [API Reference](#api-reference)
  - [Users](#users)
  - [Admins](#admins)
  - [Moderators](#moderators)
  - [Channel Groups](#channel-groups)
  - [Channels](#channels)
  - [Posts](#posts)
  - [Comments](#comments)
  - [Reports](#reports)
  - [Search](#search)
  - [Rawg Data](#rawg-data)
  - [Itch Data](#itch-data)
### React External Dependencies
- Tailwind CSS
- Axios
- Daisy UI
- React Router development
- Swiper
- Leo Profanity

### Ruby on Rails External Dependencies
- httparty
- devise
- devise-jwt
- pg
- props_template
- factory bot rails
- rspec rails
## Environment Variables

To run this project, you will need to add the following environment variables to your .env files

#### React Source Folder
`VITE_API_URL`

#### Rails Source Folder
`POSTGRES_USERNAME`
`POSTGRES_PASSWORD`
`POSTGRES_HOST`
`POSTGRES_PORT`
`RAILS_MAX_THREADS`
`GAME_FORUM_DATABASE_PASSWORD`
`DEVISE_JWT_SECRET_KEY`
`ITCH_API_KEY`
`RAWG_API_KEY`


## Running The App Locally
- Open terminal inside the `game-forum` directory
- Install bundle with `bundle install`
- Open a separate terminal inside the `game-forum-front-end` directory
- Install all react modules with `pnpm install`
- Start the front end and back end servers using open terminals
- Use the app using the front end app port
## API Reference
### Users
#### Get user

```http
  GET /api/v1/users/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "You are now viewing user01"
    },
    "data": {
        "id": 3,
        "username": "user01",
        "email": "user01_test@test.com",
        "role": "user",
        "deactivated": false,
        "created_at": "2025-10-31T11:23:47.088Z",
        "updated_at": "2025-10-31T11:23:47.088Z"
    }
}
```

#### Update user
User can only update their own account
```http
  PATCH /api/v1/users/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of user to fetch |
| `username`   | `string` | Username of user |
| `email` | `string` | Email of user |
| `password` | `string` | Password of user |
| `profile_picture` | `string` | URL of user's profile picture |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Update successful!"
    },
    "data": {
        "id": 1,
        "username": "user_01",
        "email": "user01_test@test.com",
        "password": null,
        "profile_picture": "https://cataas.com/cat",
        "role": "user",
        "deactivated": false,
        "moderator_status": "not_applied",
        "created_at": "2025-10-31T11:23:46.547Z",
        "updated_at": "2025-10-31T11:23:46.547Z"
    }
}
```
#### Deactivate user
User can only update their own account
```http
  DELETE /api/v1/users/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "message": "Deactivation successful"
}
```

#### Get all of current user's posts
```http
  DELETE /api/v1/all_posts
```
#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Posts fetching successful!"
    },
    "data": {
        "id": 3,
        "username": "user01",
        "email": "user01_test@test.com",
        "role": "user",
        "created_at": "2025-10-31T11:23:47.088Z",
        "updated_at": "2025-10-31T11:23:47.088Z",
        "posts": [
            {
                "id": 6,
                "title": "Please add an inventory view outside of selling or foraging",
...
```

#### Apply for moderator as current user
```http
  PATCH /api/v1/apply_mod
```
#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Moderator application now pending for approval."
    },
    "data": {
        "id": 3,
        "username": "user01",
        "email": "user01_test@test.com",
        "role": "user",
        "deactivated": false,
        "moderator_status": "pending",
        "created_at": "2025-10-31T11:23:47.088Z",
        "updated_at": "2025-11-01T05:12:41.739Z"
    }
}
```
### Admins
#### Create user

```http
  POST/api/v1/admins/users
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. Email of new user |
| `password`   | `string` | **Required**. Password of new user |
| `username`   | `string` | **Required**. Username of new user |
| `role`   | `string (enum)` | **Required**. Role of new user. User, Moderator, or Admin |

#### Sample Response
```
{
    "status": {
        "code": 201,
        "message": "created by admin(user) has been created!"
    },
    "data": {
        "id": 10,
        "username": "created by admin",
        "email": "admin_create@test.com",
        "role": "user",
        "created_at": "2025-11-01T06:52:35.591Z",
        "updated_at": "2025-11-01T06:52:35.591Z"
    }
}
```

#### Get user
```http
  GET /api/v1/admins/users/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "You are now viewing created by admin"
    },
    "data": {
        "id": 10,
        "username": "created by admin",
        "email": "admin_create@test.com",
        "role": "user",
        "deactivated": false,
        "created_at": "2025-11-01T06:52:35.591Z",
        "updated_at": "2025-11-01T06:52:35.591Z"
    }
}
```

#### Show all users
```http
  GET /api/v1/admins/show_all
```
#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Successfully fetched users"
    },
    "data": {
        "moderators": [
            {
                "id": 2,
                "username": "moderater_one",
                "email": "moderator_test@test.com",
                "role": "moderator",
                "created_at": "2025-10-31T11:23:46.818Z",
                "updated_at": "2025-11-01T03:53:15.083Z"
            }
        ],
...
```

#### Update user
```http
  PATCH /api/v1/admins/users/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "confusing name's credentials has been updated!"
    },
    "data": {
        "id": 10,
        "username": "confusing name",
        "email": "admin_create@test.com",
        "role": "user",
        "created_at": "2025-11-01T06:52:35.591Z",
        "updated_at": "2025-11-01T07:13:16.441Z"
    }
}
```

#### Approve moderator
```http
  PATCH /api/v1/admins/approve_mod/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "user01 is now a moderator."
    },
    "data": {
        "id": 3,
        "username": "user01",
        "email": "user01_test@test.com",
        "role": "user",
        "moderator_status": "approved",
        "mod_approval_date": "2025-11-01T07:14:51.973Z",
        "created_at": "2025-10-31T11:23:47.088Z",
        "updated_at": "2025-11-01T07:14:51.974Z"
    }
}
```

#### Ban user
```http
  PATCH /api/v1/admins/ban/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "message": "user has been banned."
}
```
### Moderators

#### Get user
```http
  GET /api/v1/moderators/users/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "You are now viewing created by admin"
    },
    "data": {
        "id": 10,
        "username": "created by admin",
        "email": "admin_create@test.com",
        "role": "user",
        "deactivated": false,
        "created_at": "2025-11-01T06:52:35.591Z",
        "updated_at": "2025-11-01T06:52:35.591Z"
    }
}
```

#### Update user
```http
  PATCH /api/v1/moderators/users/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "confusing name's credentials has been updated!"
    },
    "data": {
        "id": 10,
        "username": "confusing name",
        "email": "admin_create@test.com",
        "role": "user",
        "created_at": "2025-11-01T06:52:35.591Z",
        "updated_at": "2025-11-01T07:13:16.441Z"
    }
}
```

#### Ban user
```http
  PATCH /api/v1/moderators/ban/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of user to fetch |

#### Sample Response
```
{
    "message": "user has been banned."
}
```
### Channel Groups
#### Get all channel groups
```http
  GET /api/v1/channelgroups
```

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched channel group successfully"
    },
    "data": [
        {
            "channelgroup_details": {
                "id": 1,
                "title": "Welcome!",
                "description": "New to the forum? Keep to date with announcements and rules here!"
            },
            "channels": [
                {
                    "id": 1,
                    "title": "Delete This",
...
```
#### Get channel group

```http
  GET /api/v1/channelgroups/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of channelgroup to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched channel group 2 successfully"
    },
    "data": {
        "channelgroup_details": {
            "id": 2,
            "title": "Pluck & Brew",
            "description": "Anything and everything related to Pluck & Brew!"
        },
        "channels": [
            {
                "id": 4,
                "title": "Game Discussion",
                "description": "Talk about the game here!",
...
```

#### Create channel group
User needs an admin/moderator account to proceed with this action
```http
  POST /api/v1/channelgroups
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`   | `string` | **Required**. Title of channelgroup |
| `description` | `string` | **Required**. Description of channelgroup |

#### Sample Response
```
{
    "status": {
        "code": 201,
        "message": "Created channel group 4 successfully"
    },
    "data": {
        "id": 4,
        "title": "api test",
        "description": "test description",
        "channels": [],
        "created_at": "2025-10-31T10:35:38.539Z",
        "updated_at": "2025-10-31T10:35:38.539Z"
    }
}
```

#### Update channel group
User needs an admin/moderator account to proceed with this action
```http
  PATCH /api/v1/channelgroups/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of channelgroup to fetch |
| `title`   | `string` | Title of channelgroup |
| `description` | `string` | Description of channelgroup |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Updated channel group 4 successfully"
    },
    "data": {
        "id": 4,
        "title": "api test",
        "description": "test change description",
        "channels": [],
        "created_at": "2025-10-31T10:35:38.539Z",
        "updated_at": "2025-10-31T10:37:33.346Z"
    }
}
```
#### Destroy channel group
User needs an admin/moderator account to proceed with this action
```http
  DELETE /api/v1/channelgroups/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of channelgroup to fetch |

#### Sample Response
```
{
    "message": "Destroy successful"
}
```
### Channels
#### Get all channels
```http
  GET /api/v1/channelgroups/${channelgroup_id}/channels
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelgroup_id` | `integer` | **Required**. Id of channelgroup to fetch |
#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched channels successfully"
    },
    "data": {
        "channelgroup_details": {
            "id": 1,
            "title": "Welcome!",
            "description": "New to the forum? Keep to date with announcements and rules here!"
        },
        "channels": [
            {
                "id": 1,
                "title": "Delete This",
                "description": "For Testing Purposes",
...
```
#### Get channel

```http
  GET /api/v1/channels/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of channel to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched channel 1 successfully"
    },
    "data": {
        "channel_details": {
            "id": 1,
            "title": "Delete This",
            "description": "For Testing Purposes",
            "post_permission": "all_users",
            "post_count": 1
        },
        "channelgroup_details": {
            "id": 1,
            "title": "Welcome!"
...
```

#### Create channel
User needs an admin/moderator account to proceed with this action
```http
  POST /api/v1/channelgroups/${channelgroup_id}/channels
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelgroup_id`      | `integer` | **Required**. Id of channelgroup to fetch |
| `title`   | `string` | **Required**. Title of channel |
| `description` | `string` | **Required**. Description of channel |

#### Sample Response
```
{
    "status": {
        "code": 201,
        "message": "Created channel 9 successfully"
    },
    "data": {
        "channel_details": {
            "id": 9,
            "title": "api test",
            "description": "test description",
            "post_permission": "all_users",
            "post_count": 0
        },
        "channelgroup_details": {
            "id": 1,
            "title": "Welcome!"
...
```

#### Update channel
User needs an admin/moderator account to proceed with this action
```http
  PATCH /api/v1/channels/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of channel to fetch |
| `title`   | `string` | Title of channelgroup |
| `description` | `string` | Description of channelgroup |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Updated channel 1 successfully"
    },
    "data": {
        "channel_details": {
            "id": 1,
            "title": "api test",
            "description": "test change description",
            "post_permission": "all_users",
            "post_count": 1
        },
        "channelgroup_details": {
            "id": 1,
            "title": "Welcome!"
...
```
#### Destroy channel group
User needs an admin/moderator account to proceed with this action
```http
  DELETE /api/v1/channels/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of channel to fetch |

#### Sample Response
```
{
    "message": "Destroy successful"
}
```
### Posts
#### Get all posts
```http
  GET /api/v1/channels/${channel_id}/posts
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channel_id` | `integer` | **Required**. Id of channel to fetch |
#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched channels successfully"
    },
    "data": {
        "channel_details": {
            "id": 1,
            "title": "api test",
            "description": "test description",
            "post_permission": "all_users"
        },
        "posts": [
            {
                "id": 1,
                "title": "Delete Post Test",
...
```
#### Get post

```http
  GET /api/v1/posts/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of post to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched post 1 successfully"
    },
    "data": {
        "id": 1,
        "title": "Delete Post Test",
        "body": "Delete This Please",
        "channel_id": 1,
        "comment_count": 1,
        "created_at": "2025-10-31T09:27:06.034Z",
        "updated_at": "2025-10-31T09:27:06.034Z",
        "owner_details": {
            "id": 4,
...
```

#### Create post
User needs an account to proceed with this action
```http
  POST /api/v1/channels/${channel_id}/posts
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channel_id`      | `integer` | **Required**. Id of channel to fetch |
| `title`   | `string` | **Required**. Title of post |
| `body` | `string` | **Required**. Body of post |

#### Sample Response
```
{
    "status": {
        "code": 201,
        "message": "Created post 8 successfully"
    },
    "data": {
        "post_details": {
            "id": 8,
            "title": "api test",
            "body": "test description",
            "comment_count": 0
        },
        "channel_details": {
            "id": 1,
            "title": "api test",
            "post_permission": "all_users"
...
```

#### Update post
User needs an admin/moderator account or be the creator of the post to proceed with this action
```http
  PATCH /api/v1/posts/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of post to fetch |
| `title`   | `string` | **Required**. Title of post |
| `body` | `string` | **Required**. Body of post |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Updated post 8 successfully"
    },
    "data": {
        "post_details": {
            "id": 8,
            "title": "api test",
            "body": "test change description",
            "comment_count": 0
        },
        "channel_details": {
            "id": 1,
            "title": "api test"
...
```
#### Destroy post
User needs an admin/moderator account or be the creator of the post to proceed with this action
```http
  DELETE /api/v1/posts/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of post to fetch |

#### Sample Response
```
{
    "message": "Destroy successful"
}
```
### Comments
#### Get all comments
```http
  GET /api/v1/posts/${post_id}/comments
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `post_id` | `integer` | **Required**. Id of post to fetch |
#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched comments successfully"
    },
    "data": {
        "post_details": {
            "id": 1,
            "title": "Delete Post Test",
            "body": "Delete This Please",
            "owner_details": {
                "id": 4,
                "username": "user02"
            },
            "comment_count": 1
...
```
#### Get comment

```http
  GET /api/v1/comments/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of comment to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched comment 1 successfully"
    },
    "data": {
        "comment_details": {
            "id": 1,
            "body": "Delete Comment Test",
            "post_id": 1
        },
        "owner_details": {
            "id": 3,
            "username": "user01"
        },
        "created_at": "2025-10-31T09:27:06.112Z",
...
```

#### Create comment
User needs an account to proceed with this action
```http
  POST /api/v1/posts/${post_id}/comments
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `post_id`      | `integer` | **Required**. Id of post to fetch |
| `body` | `string` | **Required**. Body of comment |

#### Sample Response
```
{
    "status": {
        "code": 201,
        "message": "Created comment 7 successfully"
    },
    "data": {
        "comment_details": {
            "id": 7,
            "body": "test change description",
            "owner_details": {
                "id": 1,
                "username": "god_mode"
            }
        },
        "post_details": {
            "id": 1,
...
```

#### Update comment
User needs an admin/moderator account or be the creator of the comment to proceed with this action
```http
  PATCH /api/v1/comments/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of comment to fetch |
| `body` | `string` | **Required**. Body of comment |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Updated comment 7 successfully"
    },
    "data": {
        "comment_details": {
            "id": 7,
            "body": "test change description",
            "owner_details": {
                "id": 1,
                "username": "god_mode"
            }
        },
        "post_details": {
            "id": 1,
...
```
#### Destroy comment
User needs an admin/moderator account or be the creator of the post to proceed with this action
```http
  DELETE /api/v1/comments/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of comment to fetch |

#### Sample Response
```
{
    "message": "Destroy successful"
}
```

### Reports
User requires an admin/moderator account to proceed with all actions below
#### Get all reports
```http
  GET /api/v1/reports
```
#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched reports successfully"
    },
    "data": {
        "posts": [
            {
                "report_details": {
                    "id": 1,
                    "report_reason": "spam",
                    "archive": false
                },
                "post_details": {
                    "id": 1,
                    "title": "Delete Post Test",
...
```

#### Get report
```http
  GET /api/v1/reports/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of report to fetch |

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched report 3 successfully"
    },
    "data": {
        "report_details": {
            "id": 3,
            "content_type": "post",
            "report_reason": "harassment"
        },
        "post_details": {
            "id": 1,
            "title": "Delete Post Test",
            "body": "Delete This Please"
        },
...
```

#### Create report

```http
  POST /api/v1/reports
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `content_type`      | `integer(enum)` | **Required**. Post or comment |
| `content_id`      | `integer` | **Required**. Id of post or comment |
| `report_reason`      | `integer(enum)` | **Required**. Spam, harassment, inappropriate content, cheating, off_topic, impersonation, or others |

#### Sample Response
```
{
    "status": {
        "code": 201,
        "message": "Created report 3 successfully"
    },
    "data": {
        "report_details": {
            "id": 3,
            "content_type": "post",
            "report_reason": "harassment"
        },
        "post_details": {
            "id": 1,
            "title": "Delete Post Test",
            "body": "Delete This Please"
        },
...
```

#### Show archive of comments
```http
  GET /api/v1/reports/archive
```

#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched archived reports successfully"
    },
    "data": {
        "posts": [
            {
                "report_details": {
                    "id": 5,
                    "report_reason": "harassment",
                    "archive": true
                },
                "post_details": {
                    "id": 1,
                    "title": "Delete Post Test",
...
```

#### Archive report
```http
  PATCH /api/v1/reports/archive/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of report to fetch |

#### Sample Response
```
{
    "message": "Archive successful"
}
```

#### Destroy report
```http
  DELETE /api/v1/reports/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `integer` | **Required**. Id of report to fetch |

#### Sample Response
```
{
    "message": "Destroy successful"
}
```
### Search

#### Get data
```http
  GET /api/v1/search
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query` | `string` | keyword to use for searching |
#### Sample Response
```
{
    "status": {
        "code": 200,
        "message": "Fetched search results successfully"
    },
    "data": {
        "posts": [],
        "users": [
            {
                "id": 3,
                "username": "user01",
                "role": "user",
                "profile_picture": "https://cataas.com/cat",
                "post_count": 2
            },
            {
...
```
### Rawg Data
Requires an API Key from Rawg
#### Get data
```http
  GET /api/v1/rawgdata
```
#### Sample Response
```
[
    {
        "id": 1,
        "name_original": "Strange Horticulture",
        "background_image": "https://media.rawg.io/media/games/add/add2aecd96e74df7e27082328039957e.jpg",
        "website": "https://www.badviking.com/",
        "developer": "Bad Viking",
        "genres": "Adventure, Simulation",
        "created_at": "2025-10-31T09:27:07.375Z",
        "updated_at": "2025-10-31T09:27:07.375Z",
        "game_slug": "strange-horticulture"
    },
...
```

### Itch Data
Requires an API Key from itch.io
#### Get data
```http
  GET /api/v1/itchdata
```
#### Sample Response
```
[
    {
        "id": 1,
        "views_count": 1293,
        "downloads_count": 19,
        "created_at": "2025-10-31T09:27:13.043Z",
        "updated_at": "2025-10-31T09:27:13.043Z"
    }
]
```

## Collaborators

- [@edarasen](https://www.github.com/edarasen)
- [@AvelDanielPadilla](https://github.com/AvelDanielPadilla)
- [@daleespi93](https://github.com/daleespi93)