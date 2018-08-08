import {AsyncStorage} from 'react-native'
import isUndefined from 'lodash/isUndefined'
import forEach from 'lodash/forEach'
import isNull from 'lodash/isNull'
import keys from 'lodash/keys'

let storage = AsyncStorage
const prefix = 'cso.'
const tmpPrefix = 'tmp.'

const prefixKey = (key, persistent) => {
    return persistent ? prefix + key : prefix + tmpPrefix + key
}

export default {
    set: (key, value, persistent = true) => {
        return storage.setItem(prefixKey(key, persistent), JSON.stringify(value))
    },
    get: (key, persistent = true) => {
        return storage.getItem(prefixKey(key, persistent))

    },
    delete: (key, persistent = true) => {
        storage.removeItem(prefixKey(key, persistent))
    },
    cleanTmp: () => {
        forEach(keys(storage), function (key) {
            if (key.indexOf(prefix + tmpPrefix) > -1) {
                storage.removeItem(key)
            }
        })
    },
    clean: () => {
        storage.clear()
    }
}
