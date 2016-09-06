
import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

function callApi(endpoint, settings, schema) {
  // const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  const fullUrl = endpoint;

  function checkStatus(response) {
    if (response.ok) {
      return response
    } else {
      return response.text().then(function(text) {
        throw new Error(text || response.statusText)
      })
    }
  }

  function parseJSON(response) {
    return response.json()
  }

  return fetch(fullUrl, settings)
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      console.log('request succeeded with JSON response', data)
      return Object.assign({}, data)
    }).catch(function(error) {
    return Promise.reject(error.message)
  })
}


const userSchema = new Schema('user', {
  idAttribute: user => user.userId
})

export const Schemas = {
  USER: userSchema
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let {endpoint, settings} = callAPI
  const {schema, types} = callAPI

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

  const [requestType, successType, failureType] = types
  next(actionWith({
    type: requestType
  }))

  return callApi(endpoint, settings, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error || 'System Error'
    }))
  )
}
