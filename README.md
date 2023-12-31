example query in graphiQL:
```
{
    user(id: "7843r34900io") {
        firstName,
        company {
            id,
            name
        }
    }
}
```

Other useful websites:
https://cwarcup.com/blog/how-to/graphQL

To stop this error:
ReferenceError: Cannot access 'UserType' before initialization

You can put the type in a callback

Example of nested query:
```
{
  user(id: "7843r34900io") {
    firstName,
    company {
      id,
      name,
      owner {
        id,
        firstName,
      	company {
          name
          owner {
            company {
              name
            }
          }
        }
      }
    }
  }
}
```

More advanced example:
Keep the endpoints simple, as a rule of thumb make more endpoints where possible. Think client first.
Though in the case of search pages for example keep the end point generic and pass in parameters, 
otherwise there will be too many endpoints!
```
query {
  user(id: "7843r34900io") {
    firstName,
    company {
      id,
      name,
      owner {
        id,
        firstName,
      	company {
          name
          owner {
            company {
              name
            }
          }
        }
      }
    }
  },
  findCompanyById(id: "560895435h30") {
    name
  },
  findCompanyByOwnerId(id: "89jfdsdfds89") {
    name
  },
}
```