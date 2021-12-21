const express = require("express");
const { graphqlHTTP }  = require("express-graphql");
const {myschema} = require("./schema");
const { healthMonitor } = require("@condor-labs/health-middleware");
const mongoDbHelper = require("./dataBase/mongoHelper")

const app = express(); 
healthMonitor(app);

// database
mongoDbHelper.connect().then(async () => {
    // Load helpers
    const userModelDB1 = require("./dataBase/model");
    console.log(userModelDB1.findOne({}))
    console.log("Data base is conected.");
})

app.get('/', (req, res) => {
    res.json({
        message: "HOla mundo"
    });
});

app.use('/graphql', graphqlHTTP( {
    graphiql: true,
    schema: myschema,
}));

app.listen( 3000, () => console.log("Server on port 3000") );