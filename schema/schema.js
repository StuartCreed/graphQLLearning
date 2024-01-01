const graphql = require('graphql')
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
} = graphql

let companies = [
    {
        id: '89jfdsdfds89',
        name: 'Thovex',
        description: 'Landsearch company',
        ownerId: 'qftgtefds8dj80',
        field: 0
    },
    {
        id: '560895435h30',
        name: 'Poole Bay Holdings',
        description: 'Micro website company',
        ownerId: 'qftgtefds8dj80',
        field: 1
    },
    {
        id: '88908354jdf8',
        name: 'Halo',
        description: 'Event security company',
        ownerId: '7843r34900io',
        field: 1
    },
]

let users = [
    {
        id: '7843r34900io',
        firstName: 'Stuart',
        age: 89,
        profession: 0,
        companyId: '89jfdsdfds89'
    },
    {
        id: 'dsfsd349sdfd9',
        firstName: 'Alastair',
        age: 56,
        profession: 1,
        companyId: '89jfdsdfds89'
    },
    {
        id: 'qftgtefds8dj80',
        firstName: 'Callum',
        age: 31,
        profession: 2,
        companyId: '88908354jdf8'
    },
]

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) } ,
        description: { type: GraphQLString },
        field: {
            type: new GraphQLNonNull(new GraphQLEnumType({
                name: 'Field',
                values: {
                    'land': { value: 0 },
                    'tech': { value:  1 },
                }
            }))
        },
        owner: {
            type: new GraphQLNonNull(UserType),
            resolve(parentValue, args) {
                return users.find(u => u.id === parentValue.ownerId)
            }
        }
    })
})

const ProfessionEnumType = new GraphQLEnumType({
    name: 'Profession',
    values: {
        'Designer': { value: 0 },
        'Manager': { value:  1 },
        'Developer': { value: 2 }
    }
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) } ,
        age: { type: GraphQLInt },
        profession: {
            type: new GraphQLNonNull(ProfessionEnumType)
        },
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
                ownerId: { type: new GraphQLNonNull(GraphQLString) },
                profession: { type: new GraphQLNonNull(ProfessionEnumType) }
            },
            resolve(parentValue, args) {
                const newCompany = {
                    id: _.random(1000000000000),
                    name: args.name,
                    description: args.description,
                    ownerId: args.ownerId,
                    profession: args.profession
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