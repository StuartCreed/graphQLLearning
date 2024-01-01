const graphql = require('graphql')
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

let companies = [
    {
        id: '89jfdsdfds89',
        name: 'Thovex',
        description: 'Landsearch company',
        ownerId: 'qftgtefds8dj80'
    },
    {
        id: '560895435h30',
        name: 'Poole Bay Holdings',
        description: 'Micro website company',
        ownerId: 'qftgtefds8dj80'
    },
    {
        id: '88908354jdf8',
        name: 'Halo',
        description: 'Event security company',
        ownerId: '7843r34900io'
    },
]

let users = [
    {
        id: '7843r34900io',
        firstName: 'Stuart',
        age: 89,
        companyId: '89jfdsdfds89'
    },
    {
        id: 'dsfsd349sdfd9',
        firstName: 'Alastair',
        age: 56,
        companyId: '89jfdsdfds89'
    },
    {
        id: 'qftgtefds8dj80',
        firstName: 'Callum',
        age: 31,
        companyId: '88908354jdf8'
    },
]

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) } ,
        description: { type: GraphQLString },
        owner: {
            type: new GraphQLNonNull(UserType),
            resolve(parentValue, args) {
                return users.find(u => u.id === parentValue.ownerId)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) } ,
        age: { type: GraphQLInt },
        company: { 
            type: new GraphQLNonNull(CompanyType),
            resolve(parentValue, args) {
                return companies.find(c => c.id === parentValue.companyId)
            }
         }
    }
})

const queries = new GraphQLObjectType({
    name: 'Queries',
    fields: {
        findUserById: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) }},
            resolve(parentValue, args) {
                return users.find(u => u.id === args.id)
            }
        },
        findCompanyById: {
            type: CompanyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return companies.find(c => c.id === args.id)
            }
        },
        findCompanyByOwnerId: {
            type: CompanyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return companies.find(c => c.ownerId === args.id)
            }
        },
        findUsersByCompanyName: {
            type: new GraphQLList(UserType),
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return users.filter(user => {
                    const userCompany = companies.find(company => company.id === user.companyId)
                    return userCompany.name === args.name
                })
            }
        },
    },
})

const mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addCompany: {
            type: CompanyType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                ownerId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                const newCompany = {
                    id: _.random(1000000000000),
                    name: args.name,
                    description: args.description,
                    ownerId: args.ownerId
                }
                companies.push(newCompany)
                return newCompany
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: queries,
    mutation: mutations
})