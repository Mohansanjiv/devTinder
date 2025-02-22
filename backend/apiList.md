# devTinder apis

## authRouter

- POST /auth/signup
- POST /auth/login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRouter

- POST /request/send/status/:userId
- POST /request/send/status/:requestId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed -get you the profiles of other users on platform

status- ignore, intrested, accepted, rejected
