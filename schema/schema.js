const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

const companies = [
    {
        id: '89jfdsdfds89',
        name: 'Thovex',
        description: 'Landsearch company'
    },
    {
        id: '560895435h30',
        name: 'Poole Bay Holdings',
        description: 'Micro website company'
    },
    {
        id: '78908354jdf8',
        name: 'Halo',
        description: 'Event security company'
    },
]

const users = [
    {
        id: '7843r34900io',
        firstName: 'Stuart',
        age: 89,
        companyId: '89jfdsdfds89'
    },
    {
        id: '7843r34900io',
        firstName: 'Alastair',
        age: 56,
        companyId: '89jfdsdfds89'
    },
    {
        id: '560895435h30',
        firstName: 'Rickard',
        age: 31,
        companyId: '78908354jdf8'
    },
]

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString } ,
        description: { type: GraphQLString }
    }
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString } ,
        age: { type: GraphQLInt },
        company: { 
            type: CompanyType,
            resolve(parentValue, args) {
                console.log('UserType', parentValue, args)
                return companies.find(c => c.id === parentValue.companyId)
            }
         }
    }
})

const UserQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args) {
                console.log('RootQueryType', parentValue, args)
                return users.find(u => u.id === args.id)
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: UserQuery,
})