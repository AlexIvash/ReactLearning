import axios from "axios";

//const baseUrl = `https://social-network.samuraijs.com/api/1.0/`; - уже не нужно, это в instance лежит
/**
 * Создаать отдельный экземпляр axios. Это для того, чтобы можно было удобно создаавать некие объекты для запросов
 * и подменять их. Это ООП код - то есть менять объекты например API key, или withCredentials - true.

 * headers и другие конфиги закомментированы, так как с ними запрос не работает. Это происходит потому,
 * что нет платной подписки на samurai.js - API.

 * baseUrl - обязательно должен быть написан как "baseUrl" - иначе instance не будет работать
 *
 *
 * withCredentials, headers with Api-Key - обязательные данные для delete/post запросов и так же auth get запроса. Без них они не заработают.
 * Но они не заработают и так, потому что API-key - неправильный и чтобы получить правильный нам необходимо использовать
 * платную подписку. Если я разблокирую их - мой get запрос тоже перестанет работать. get запрос работает БЕЗ платной подписки,
 * поэтому не думаю что имеет смысл разблокировать их
 */
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
    /* Если добавить этот config - тогда запрос не будет работать.
                  withCredentials: true,
                  headers: {
                        "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
                        }
              */
});


/**
 * Здесь мы return не то что сделает axios.get, а что делает callback .then, то есть возвращает данные которые получает запрос.
 *
 * Так как у нас есть axios.create c указанием всех необходимых headers и других параметров - мы пишем теперь
 * не axios.get(baseUrl + `users?page=${currentPage}&count=${pageSize}`), а
 * instance.get(`users?page=${currentPage}&count=${pageSize}`) и спользование header в каждом запросе
 * больше не нужно. Все headers указаны в instance и теперь можно использовать его
 * для каждого запроса.

 * instance в параметрах так же использует базовый url. Потому указывать его уже не обязательно
Методы закомментированы, так как есть более красивая оболочка для этих методов. Хотя каждый вариант правильный

export const getUsers = (currentPage, pageSize) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        });
}

export const follow = (userId) => {
    return instance.post(`follow${userId}`,{})
        .then(response => {
            return response.data;
        });
}

export const unfollow = (userId) => {
    return instance.delete(`follow${userId}`,{})
        .then(response => {
            return response.data;
        });
}

export const login = () => {
    return instance.get('auth/me')
        .then(response => {
            return response.data;
        });
}

export const profile = (userId) => {
    return instance.get('profile/' + userId)
        .then(response => {
            return response.data;
        });
}

 Нужно сказать что у него здесь нет return response.data - но у нас просто сделано более продуктивно и красиво
 У него в видео он не делал пока. Но у нас лучше и поэтому лучше не переделывать.
 */

export const usersApi = {
    getUsers (currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    follow (userId) {
        return instance.post(`follow${userId}`,{})
            .then(response => {
                return response.data;
            });
    },

    unfollow (userId) {
        return instance.delete(`follow${userId}`,{})
            .then(response => {
                return response.data;
            });
    },

    login () {
        return instance.get('auth/me')
            .then(response => {
                return response.data;
            });
    },

    profile (userId) {
        console.warn("Obsolete method. Please, use profileApi")
       /** return instance.get('profile/' + userId)
            .then(response => {
                return response.data;
            });
        ^^^ Мы больше не используем этот метод, а используем profileApi, потому если кто-то будет
        вызывать этот метод - мы его будем переводить на вызов profileApi,но дальнейший код
        где мы еще будем брать profile - мы будем вызывать profileApi напрямую, и тогда не будет console.warn
        */
        return profileApi.getProfile(userId);
    }
}

export const profileApi = {
    getProfile (userId) {
        return instance.get('profile/' + userId)
            .then(response => {
                return response.data;
            });
    },
    getStatus (userId) {
        return instance.get('profile/status/' + userId)
            .then(response => {
                return response.data;
            });
    },
    updateStatus (status) {
        /**
         * Мы не имеем права обновить чужой статус, потому тут будет только один userId - свой userId.
         * userId будет зашит в cookie?
         * {status:status} - передавать необязательно так как значение равно имени переменной(или как-то так)
         * потому просто передадим {status}
         *
         *
         * ЗАБАВНО, НО - если здесь был profile/status/ то не подгружалась аватарка в профайле. Как это связано - я вообще хер знает 0_о
         */
 return instance.put('profile/status', {status: status})
 }
 }