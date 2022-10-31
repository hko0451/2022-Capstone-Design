<template>
  <div>
    <div class="card-title">
      {{ product.name }}
    </div>
    <div class="card-body">
      <i :class="[prefixst, iconst]"></i>
<!--      <i class="icofont-10x icofont-raddish"></i>-->
      <form>
        <div class="row">
          <div class="cell">
            <label>Type:</label>
          </div>
          <div class="cell">
            <em>{{ product.type }}</em>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Price:</label>
          </div>
          <div class="cell">
            ${{ product.price.USD }}
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Quantity:</label>
          </div>
          <div class="cell">
            <input type="number" v-model.number="quantity">
          </div>
        </div>
      </form>
    </div>
    <div class="card-footer">
      <button @click="addToCart(product.name,quantity), getIcon()" class="btn btn-light">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product', 'addToCart'],
  data () {
    return {
      quantity: 0,
      prefixst: 'icofont-10x icofont-' + this.product.icon
    }
  }
}
</script>

<style scoped>

</style>
