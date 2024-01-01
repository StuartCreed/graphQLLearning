example query in graphiQL:
```
{
    findUserById(id: "7843r34900io") {
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
  findUserById(id: "7843r34900io") {
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
fragment companyInfo on Company {
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

query LoggedInUserInfo($loggedInUserId: String!) {
  findUserById(id: $loggedInUserId) {
    firstName,
    company {
      ...companyInfo
    }
  },
  findCompanyById(id: "560895435h30") {
    name
  },
  findCompanyByOwnerId(id: $loggedInUserId) {
    name
  },
  findUsersByCompanyName(name: "Halo") {
    id,
    firstName,
    company {
      ...companyInfo
    }
  }
}

query OtherQueries {
  findCompanyById(id: "560895435h30") {
    name
  },
  findUsersByCompanyName(name: "Halo") {
    id,
    firstName,
    company {
      ...companyInfo
    }
  }
}
```

with variable:

```
{
  "loggedInUserId": "qftgtefds8dj80"
}
```

Example mutation:
```
mutation {
  addCompany(name: "CIMPA", description: "PLM company", ownerId: "89jfdsdfds89") {
  	id
	}
}
```