import PouchDB from 'pouchdb'
import _ from 'lodash'

const db = new PouchDB('aaa')
window.PouchDB = PouchDB
const remotedb = false // new PouchDB('https://papricek.cloudant.com/aleebi')
const store = {}

// PouchDB.debug.disable()

store.create = (type, data) => {
  return db.post({type: type, data: data})
}

store.findAll = () => {
  return db.allDocs({include_docs: false}).then(items =>
    _.map(items, (item) => item)
  )
}

store.reloadProperty = (obj, prop) => {
  store.findQuotes().then(posts => {
    obj[prop] = _.map(posts, (post) => post.doc)
    console.log(obj[prop])
  })
  if (remotedb) {
    db.sync(remotedb)
  }
}

store.findQuotes = () => {
  function map (doc, emit) {
    if (doc.type === 'quote') {
      emit(doc.createdAt)
    }
  }
  return db.query(map, {include_docs: true}).then(posts =>
    _.map(posts.rows, (post) => post)
  )
}

export default store
