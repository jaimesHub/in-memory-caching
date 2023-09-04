# Caching Design: In-memory caching (local caching)

## 1. Express application generator
- https://expressjs.com/en/starter/generator.html

## 2. Install the modules
- `cd myapp`
- `npm i`

## 3. Configuration
- .env
- helpers.js
- config.js

## 4. Input
- Using RapidAPI for get data
- Link API: `https://rapidapi.com/vacationist/api/iata-and-icao-codes/`

## 5. API for testing
- `http://localhost:3000/airports` : testing the implementation of read-aside strategy
- `http://localhost:3000/stats` : checking the statistics of infomation about cache hit/miss...after calling `/airports api`

## 6. Output
```
Server running on http://localhost:3000
[Mon Sep 04 2023 01:45:54 GMT+0700 (Indochina Time)] Fetch data from API
GET /airports 304 1154.691 ms - -
GET /stats 200 0.499 ms - 54

[Mon Sep 04 2023 01:46:35 GMT+0700 (Indochina Time)] Get data from Node Cache
GET /airports 304 3.727 ms - -
GET /stats 200 0.727 ms - 54

[Mon Sep 04 2023 01:46:58 GMT+0700 (Indochina Time)] Fetch data from API
GET /airports 304 482.938 ms - -
GET /stats 304 0.587 ms - -
GET /stats 304 0.501 ms - -

[Mon Sep 04 2023 01:47:14 GMT+0700 (Indochina Time)] Get data from Node Cache
GET /airports 304 2.834 ms - -
GET /stats 200 0.570 ms - 54
```

## 7. What I've done with this exercise
1. Content: List of Airports (Code, name)
2. Read Aside with TTL
3. Allow to use libs

`Note:` 
- Please check all of implemented logics on `./myapp/routes/index.js`
- My struggles: It is hard to find template APIs to visualize my output because I'm lazy to implement my own database :D

## 8. Next challenge that I want to do
- Implementing with `Redis`