import * as TYPES from '../constants/constants';

const updatedDoc = (oldDoc, fields) => {
  const newDoc = {
    ...oldDoc,
  };
  _.each(fields, (value, key) => {
    if (value === undefined) {
      newDoc[key] = null;
      delete newDoc[key];
    } else {
      // DDP doesn't care how nested fields have changed
      newDoc[key] = value;
    }
  });
  return newDoc;
};

const changedDoc = (state, collection, id, fields) => {
  return {
    ...state,
    [collection]: {
      ...state[collection],
      [id]: updatedDoc(state[collection][id], fields),
    },
  };
};

const removedDoc = (state, collection, id) => {
  return {
    ...state,
    [collection]: {
      ..._.omit(state[collection], id),
    }
  };
};

const addedDoc = (state, collection, id, fields) => {
  return {
    ...state,
    [collection]: {
      ...state[collection],
      [id]: {
        ...fields,
        _id: id,
      },
    },
  };
};

export default function collectionReducer(state = {}, { type, payload }) {
  switch (type) {
    case TYPES.COLLECTION_ADDED:
      var { collection, id, fields } = payload;
      return addedDoc(state, collection, id, fields);
    case TYPES.COLLECTION_CHANGED:
      var { collection, id, fields } = payload;
      return changedDoc(state, collection, id, fields);
    case TYPES.COLLECTION_REMOVED:
      var { collection, id } = payload;
      return removedDoc(state, collection, id);
    // This is when the optimistic UI operation is verified
    case TYPES.COLLECTION_REPLACE:
      var { collection, id, replace } = payload;
      // This can work three ways
      if (!replace) {
        // Remove the doc
        return removedDoc(state, collection, id);
      } else if (!state[collection] || !state[collection][id]) {
        // Insert the doc
        return addedDoc(state, collection, id, replace);
      } else {
        // Update the doc
        return changedDoc(state, collection, id, replace);
      }
      // Not sure if this should ever happen?
      console.log('Optimistic UI fail?');
      return state;
    case TYPES.COLLECTION_RESET:
      var { collection } = payload;
      return {
        ...state,
        [collection]: {},
      };
    default:
      return state
  }
};
