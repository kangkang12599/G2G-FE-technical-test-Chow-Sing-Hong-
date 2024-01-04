<template>
    <div class="main">
        <div class="header">
            <div class="start"><router-link to="/">Home</router-link></div>
            <div class="center"><h1 class="title">Your Wish List</h1></div>
            <div class="end"></div>
        </div>
        <div class="product-list">
            <div class="container" v-for="product in productsInWishList" :key="product.id">
                <Product :product="product" :isInWishList="wishList.includes(product.id)"
                    @addIntoWishList="addIntoWishList(product.id)" @removeFromWishList="removeFromWishList(product.id)" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { wishList, addIntoWishList, removeFromWishList, getWishList } from '@/composables/wishlist.js'
import Product from '@/components/Product.vue'

const products = [
    {
        id: 1,
        name: 'Regular Fit Jacket with corduroy collar',
        category: 'Men',
        price: 24.00,
        image: 'Regular Fit Jacket with corduroy collar.png'
    },
    {
        id: 2,
        name: 'Relaxed Fit Embroidered sweatshirt',
        category: 'Men',
        price: 30.00,
        image: 'Relaxed Fit Embroidered sweatshirt.png'
    },
    {
        id: 3,
        name: 'Relaxed Fit Sweatshirt',
        category: 'Men',
        price: 50.00,
        image: 'Relaxed Fit Sweatshirt.png'
    },
    {
        id: 4,
        name: 'Motif-detail sweatshirt',
        category: 'Women',
        price: 55.00,
        image: 'Motif-detail sweatshirt.png'
    },
    {
        id: 5,
        name: 'Patterned maxi dress',
        category: 'Women',
        price: 60.00,
        image: 'Patterned maxi dress.png'
    },
    {
        id: 6,
        name: 'Shawl-collared blazer',
        category: 'Women',
        price: 72.00,
        image: 'Shawl-collared blazer.png'
    },
    {
        id: 7,
        name: 'Hoodie',
        category: 'Kids',
        price: 120.00,
        image: 'Hoodie.png'
    },
    {
        id: 8,
        name: 'Sweatshirt',
        category: 'Kids',
        price: 111.00,
        image: 'Sweatshirt.png'
    },
    {
        id: 9,
        name: 'Ribbed cotton jersey top',
        category: 'Kids',
        price: 22.00,
        image: 'Ribbed cotton jersey top.png'
    }
]

const productsInWishList = computed(() => {
    let items = products.filter(x => {
        return wishList.value.includes(x.id)
    })
    return items
})

onMounted(() => {
    getWishList()
})
</script>
<style lang="scss" scoped>
.main {
    padding: 32px;

    .header {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 32px;

        .start, .end {
            width: 20%;
            a {
                font-size: 20px;
                text-decoration: underline;
                color: #000;
            }
        }

        .center {
            width: 60%;

            .title {
                text-align: center;
            }
        }
    }

    .product-list {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .container {
            display: flex;
            justify-content: center;
            width: calc(100%/3);
            padding: 16px;
        }

        @media only screen and (max-width: 600px) {
            .container {
                width: 100%
            }
        }
    }
}
</style>