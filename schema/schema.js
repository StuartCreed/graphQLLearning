const graphql = require('graphql')
const _ = require('lodash')
const axios = require('axios').default

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

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
                console.log(parentValue)
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(r => r.data)
            }
         }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/users').then(r => _.find(r.data, {id: args.id }))
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
})