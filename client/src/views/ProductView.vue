<!-- ProductsView.vue -->
<template>
  <div class="products-page">
    <h1>Product Management</h1>

    <!-- Create Product Form -->
    <div class="create-product-section">
      <h2>Create New Product</h2>
      <form @submit.prevent="handleSubmit" class="product-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="productName">Product Name</label>
            <input
              id="productName"
              v-model="newProduct.productName"
              type="text"
              required
              placeholder="Enter product name"
            />
          </div>

          <div class="form-group">
            <label for="productCode">Product Code</label>
            <input
              id="productCode"
              v-model="newProduct.productCode"
              type="text"
              required
              placeholder="e.g. PROD001"
            />
          </div>

          <div class="form-group">
            <label for="date">Date</label>
            <input id="date" v-model="newProduct.date" type="date" required />
          </div>

          <div class="form-group">
            <label for="price">Price</label>
            <input
              id="price"
              v-model.number="newProduct.price"
              type="number"
              step="0.01"
              required
              min="0"
              placeholder="Enter price"
            />
          </div>

          <div class="form-group">
            <label for="quantity">Quantity</label>
            <input
              id="quantity"
              v-model.number="newProduct.quantity"
              type="number"
              required
              min="0"
              placeholder="Enter quantity"
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Creating...' : 'Create Product' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Products List -->
    <div class="products-list-section">
      <h2>Products List</h2>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div v-if="loading && !products.length" class="loading">Loading products...</div>

      <div v-else-if="!products.length" class="no-data">No products found.</div>

      <div v-else class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-header">
            <h3>{{ product.productName }}</h3>
            <span class="product-code">{{ product.productCode }}</span>
          </div>

          <div class="product-details">
            <div class="detail-item">
              <span class="label">Date:</span>
              <span>{{ formatDate(product.date) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Price:</span>
              <span>${{ product.price.toFixed(2) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Quantity:</span>
              <span>{{ product.quantity }}</span>
            </div>
          </div>

          <div class="product-footer">
            <span class="created-at">Created: {{ formatDateTime(product.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useProductStore } from '../stores/product'

export default {
  name: 'ProductsView',
  setup() {
    const productStore = useProductStore()
    const newProduct = ref({
      productName: '',
      date: '',
      productCode: '',
      price: '',
      quantity: '',
    })

    const resetForm = () => {
      newProduct.value = {
        productName: '',
        date: '',
        productCode: '',
        price: '',
        quantity: '',
      }
    }

    const handleSubmit = async () => {
      try {
        await productStore.createProduct(newProduct.value)
        resetForm()
      } catch (error) {
        console.error('Error creating product:', error)
      }
    }

    onMounted(() => {
      productStore.fetchProducts()
    })

    return {
      newProduct,
      handleSubmit,
      products: computed(() => productStore.products),
      loading: computed(() => productStore.loading),
      error: computed(() => productStore.error),
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    formatDateTime(dateString) {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
.products-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.create-product-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-form {
  margin-top: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #2c3e50;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.form-actions {
  margin-top: 20px;
  text-align: right;
}

.submit-btn {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.product-header h3 {
  margin: 0;
  color: #2c3e50;
}

.product-code {
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #666;
}

.product-details {
  margin: 15px 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.label {
  color: #666;
  font-weight: 500;
}

.product-footer {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  text-align: right;
}

.created-at {
  font-size: 0.85em;
  color: #666;
}

.error {
  color: #dc3545;
  padding: 20px;
  text-align: center;
  background-color: #f8d7da;
  border-radius: 4px;
  margin: 20px 0;
}

.loading,
.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 4px;
}
</style>
