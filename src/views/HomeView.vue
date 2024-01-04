<template>
  <div class="main">
    <div class="header">
      <div class="start">
        <router-link to="/wish-list">My Wishlist</router-link>
      </div>
      <div class="center">
        <div class="categories">
          <div class="category" :class="{ 'selected': selectedCategory == null }" @click="selectedCategory = null">All</div>
          <div class="category" :class="{ 'selected': selectedCategory == 'Men' }" @click="selectedCategory = 'Men'">Men
          </div>
          <div class="category" :class="{ 'selected': selectedCategory == 'Women' }" @click="selectedCategory = 'Women'">
            Women</div>
          <div class="category" :class="{ 'selected': selectedCategory == 'Kids' }" @click="selectedCategory = 'Kids'">Kids
          </div>
        </div>
      </div>
      <div class="end">
        <div class="form-group">
          <label>Sort By: </label>
          <select v-model="sorting">
            <option value="Lowest to Highest">Lowest to Highest</option>
            <option value="Highest to Lowest">Highest to Lowest</option>
            <option value="A - Z">A - Z</option>
            <option value="Z - A">Z - A</option>
          </select>
        </div>
      </div>
    </div>
    <input class="search-bar" placeholder="Search Product" v-model="searchText" />
    <div class="product-list">
      <div class="container" v-for="product in fileredProducts" :key="product.id">
        <Product :product="product" :isInWishList="wishList.includes(product.id)" @addIntoWishList="addIntoWishList(product.id)" @removeFromWishList="removeFromWishList(product.id)" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Product from '@/components/Product.vue'
import { ref, computed, onMounted } from 'vue'
import {wishList, addIntoWishList, removeFromWishList, getWishList} from '@/composables/wishlist.js'

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

const selectedCategory = ref(null)
const sorting = ref('')
const searchText = ref('')

const fileredProducts = computed(() => {
  let items = products.filter(x => {
    return (selectedCategory.value == null || x.category == selectedCategory.value) && (searchText.value.trim() == null || x.name.includes(searchText.value))
  })

  switch (sorting.value) {
    case 'Lowest to Highest':
      items = items.sort((a, b) => { return a.price - b.price })
      break
    case 'Highest to Lowest':
      items = items.sort((a, b) => { return b.price - a.price })
      break
    case 'A - Z':
      items = items.sort((a, b) => { return a.name.localeCompare(b.name) })
      break
    case 'Z - A':
      items = items.sort((a, b) => { return b.name.localeCompare(a.name) })
      break
  }

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

    .start {
      width: 20%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      a {
        font-size: 20px;
        text-decoration: underline;
        color: #000;
      }
    }

    .end {
      width: 20%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .form-group {
        label {
          font-size: 20px;
        }

        select {
          font-size: 20px;
        }
      }
    }

    .center {
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;

      .categories {
        display: flex;
        justify-content: center;
        align-items: center;

        .category {
          margin: 0px 16px;
          font-size: 24px;
          cursor: pointer;
        }

        .category.selected {
          border-bottom: 5px solid black;
        }
      }
    }

    @media only screen and (max-width: 600px) {

      .start,
      .center,
      .end {
        width: 100%;
        justify-content: center;
        margin-bottom: 16px;
      }
    }
  }

  .search-bar {
    display: block;
    width: 60%;
    margin: 0px auto;
    margin-bottom: 32px;
    padding: 16px 32px;
    font-size: 18px;
  }

  @media only screen and (max-width: 600px) {
    .search-bar {
      width: 100%
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
