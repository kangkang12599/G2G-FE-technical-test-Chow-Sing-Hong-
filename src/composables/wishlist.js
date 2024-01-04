import {ref} from 'vue'

export const wishList = ref([])

export const addIntoWishList = (id) => {
    getWishList()
    if(!wishList.value.includes(id)) {
        wishList.value.push(id)
    }
    localStorage.removeItem('wishList')
    localStorage.setItem('wishList', JSON.stringify(wishList.value))
}

export const removeFromWishList = (id) => {
    getWishList()
    wishList.value = wishList.value.filter(x => {
        return  x != id
    })
    localStorage.removeItem('wishList')
    localStorage.setItem('wishList', JSON.stringify(wishList.value))
}

export const getWishList = () => {
    wishList.value = localStorage.getItem('wishList') == null ? [] : JSON.parse(localStorage.getItem('wishList'))
}