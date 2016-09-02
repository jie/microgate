import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

function callApi(endpoint, settings, schema) {
  // const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
    const fullUrl = endpoint;

    return fetch(fullUrl, settings)
        .then(function(response) {
            if(!response.ok) {
                return {
                    message: `Error: ${response.body} || ${response.statusText}`
                }
            }
            return response.json();

        // const camelizedJson = camelizeKeys(json)
        // normalize(camelizedJson, schema)
    })
}


const userSchema = new Schema('user', {
    idAttribute: user => user.userId
})

const apiSchema = new Schema('api', {
    idAttribute: api => api.userId
})

export const Schemas = {
    USER: userSchema,
    API: apiSchema
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, settings } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, settings, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'System Error'
    }))
  )
}
