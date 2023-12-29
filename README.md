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

Other useful websites:
https://cwarcup.com/blog/how-to/graphQL

To stop this error:
ReferenceError: Cannot access 'UserType' before initialization

You can put the type in a callback