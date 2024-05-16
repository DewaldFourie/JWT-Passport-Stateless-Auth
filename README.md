In order to test this code on postman remember the following steps

- add this to the body params at the req in json raw 
{
  "email": "admin@email.com",
  "password": "admin"
}

- at the headers add
    key: Authorization 
    value: Bearer 'token' (The token can be found after passed Auth)

- at the environment variables add 
  PORT & SECRET_KEY