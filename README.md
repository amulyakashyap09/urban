# URBAN - ADDRESS RESOLVER

## Main Points
1. Seeding - formatted-coordinates.json is imported into the mongodb
2. Dockerized application - complete app is dockerized and ready to use
3. Input Validation, Modular Coding Style & Comment
4. Caching - Without caching avg response time 1920 ms after caching 9 ms
5. Test Cases - We have got our test cases covered
6. Yes, it is production ready code 

## Flow
1. `formatted-coordinates.json` geoJson file is seeded into the mongodb collection on the starting of the application
2. Uses `openstreetmap` for extract latitude and longitude from the address
3. After having lat and long, it searches in mongodb that if that lat long exists in our given coordinates file, if found we set the response into the cache
4. After first time search, it is cache into the redis, if same address is requested next time, serve from the cache
5. We only cache if address is found

## How to start it

1. Download the given zip file
2. cd within urban directory
3. Run the following commands
    1. docker-compose build --no-cache --force-rm
    2. docker-compose up --remove-orphans
4. Your Application will start running on locahost:3030 port

### Example:

```
curl --location --request GET 'localhost:3030/address/search?search=White%20Bear%20Yard'
```

#### Response

```
{
    "status": "OK",
    "search": "White Bear Yard",
    "location": {
        "address1": "White Bear Yard, Hatton Garden, London Borough of Camden, London, Greater London, England, EC1R 5DP, United Kingdom",
        "address2": "White Bear Yard, 144A, Clerkenwell Road, Hatton Garden, London Borough of Camden, London, Greater London, England, EC1R 5DU, United Kingdom",
        "serviceArea": "LONCENTRAL",
        "latitude": 51.5220923,
        "longitude": -0.1098237,
        "city": "London",
        "country": "United Kingdom"
    }
}
```