example query in graphiQL:

{
    user(id: "7843r34900io") {
        firstName,
        company {
            id,
            name
        }
    }
}