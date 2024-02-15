## Steps to setup and run this code locally
1. In terminal " npm install"
2. npx sequelize-cli db:create
3. npx sequelize-cli db:migrate
4. run code: "npm start"

## Describe the importance of pooling in database connections for a production environment.
It allows scarce resources, such as database connections, to be shared amongst multiple users, threads, or what-have-you. If you have 1000 users each requiring a connection now and then, and you don’t have a connection pool, your database will suffer. Keeping connections constantly open for each user is no good (most DBs are not great at managing large numbers of open connections). Opening and closing connections per-use is expensive (in a relative sense). With a connection pool, the users “borrow” the connection for as long as they need it, and return it to the pool. 

