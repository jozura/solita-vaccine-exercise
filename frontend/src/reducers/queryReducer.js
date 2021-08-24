import queryService from '../services/queryService.js'

const initialState = {
  "expiredBeforeUse": 0,
  "executedVaccinations": 0,
  "expiredBottles": 0,
  "total": 0,
  "goingToExpire": 0,
  "totalPerProducer": {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, [action.data.key]: action.data.payload }

    default: return state
    
  }
}

export const getNumberOfExpiredBeforeUsed = (dateString) => {
  return async dispatch => {
    const payload = await queryService.getNumberOfExpiredBeforeUsed(dateString)
    dispatch({
      type: 'QUERY',
      data: {
        key: "expiredBeforeUse",
        payload
      }
    })
  }
}

export const getNumberOfExecutedVaccinations = (dateString) => {
  return async dispatch => {
    const payload = await queryService.getNumberOfExecutedVaccinations(dateString)
    dispatch({
      type: 'QUERY',
      data: {
        key: "executedVaccinations",
        payload
      }
    })
  }
}

export const getNumberOfExpiredBottles = (dateString) => {
  return async dispatch => {
    const payload = await queryService.getNumberOfExpiredBottles(dateString)
    dispatch({
      type: 'QUERY',
      data: {
        key: "expiredBottles",
        payload
      }
    })
  }
}

export const getTotalNumberOfArrivedInjections = (dateString) => {
  return async dispatch => {
    const payload = await queryService.getTotalNumberOfArrivedInjections(dateString)
    dispatch({
      type: 'QUERY',
      data: {
        key: "total",
        payload
      }
    })
  }
}

export const getTotalNumberOfArrivedInjectionsPerProducer = (dateString) => {
  return async dispatch => {
    const payload = await queryService.getTotalNumberOfArrivedInjectionsPerProducer(dateString)

    dispatch({
      type: 'QUERY',
      data: {
        key: "totalPerProducer",
        payload
      }
    })
  }
}

export const getNumberOfGoingToExpireInNDays = (dateString, range) => {
  return async dispatch => {
    const payload = await queryService.getNumberOfGoingToExpireInNDays(dateString, range)
    dispatch({
      type: 'QUERY',
      data: {
        key: `goingToExpire`,
        payload
      }
    })
  }
}

export default reducer

