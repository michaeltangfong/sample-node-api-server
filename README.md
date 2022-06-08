# sample-node-api-server


### Get Started

install libraries
```shell
yarn install
```

run project

```
node http-server.js
```

open another shell and making request
```
curl --location '127.0.0.1:3000/hello' \
-X GET \
-H 'Content-Type: application/json' \
-d '{"name":"David"}'
```
