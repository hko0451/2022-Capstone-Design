<template>
  <main class="wrapper">
    <h1>Products</h1>

    <div class="card-container">
      <ProductCard
        v-for=" product in inventory"
        :key="product.name"
        :add-to-cart="addToCart"
        :product="product"
      ></ProductCard>
    </div>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard'
export default {
  name: 'Products',
  components: { ProductCard },
  props: ['inventory', 'addToCart']
}
</script>

<style scoped>

</style>
