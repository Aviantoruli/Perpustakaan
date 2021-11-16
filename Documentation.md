# Perpustakaan
 
before running code please run 
npm init -y
npm install
sequelize/sequelize-cli db:create
sequelize/sequelize-cli db:migrate

## List Endpoints
- `POST/register`
- `POST/login`
- `POST/createBook`
- `POST/borrow`
- `POST/return`

## Post/register
_Request Body(input)_
```
{
    "name": req.body.name",
    "email" : req.body.email
    "password" : req.body.password
}

```
## Post/login
_Request Body(input)_
```
{
    "email": req.body.email",
    "password": req.body.password"
}

```

## Post/createBook
_Request Body(input)_
```
{
    "name": req.body.name"
}

```

## Post/borrow
_Request Headers_

```
{
    access_token: req.headers.access_token
}
```

_Request Body(input)_
```
{
    "BookId": req.body.BookId",
    "year": req.body.year",
    "mount": req.body.mount",
    "day": req.body.day"
}

```

## Post/return
_Request Headers_

```
{
    access_token: req.headers.access_token
}
```

_Request Body(input)_
```
{
    "BookId": req.body.BookId",
    "year": req.body.year",
    "mount": req.body.mount",
    "day": req.body.day"
}

```
