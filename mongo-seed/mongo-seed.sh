#!/bin/bash
mongoimport --host docker-mongodb-server --db urban --collection coordinates --type json --file /usr/src/app/mongo-seed/coordinates.json