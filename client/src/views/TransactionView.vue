<!-- CreateTransactionView.vue -->
<template>
  <div class="create-transaction">
    <h1>Create Transaction</h1>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit" class="transaction-form">
      <div class="form-group">
        <label for="invoiceNo">Invoice Number</label>
        <input
          id="invoiceNo"
          v-model="transaction.invoiceNo"
          type="text"
          required
          placeholder="e.g. INV-002"
        />
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <input id="date" v-model="transaction.date" type="date" required />
      </div>

      <div class="form-group">
        <label for="customer">Customer Name</label>
        <input
          id="customer"
          v-model="transaction.customer"
          type="text"
          required
          placeholder="e.g. John Doe"
        />
      </div>

      <div class="products-section">
        <h3>Products</h3>
        <div v-for="(product, index) in transaction.product" :key="index" class="product-item">
          <div class="form-group">
            <label :for="'productCode-' + index">Product Code</label>
            <input
              :id="'productCode-' + index"
              v-model="product.productCode"
              type="text"
              required
              placeholder="e.g. PROD001"
            />
          </div>

          <div class="form-group">
            <label :for="'quantity-' + index">Quantity</label>
            <input
              :id="'quantity-' + index"
              v-model.number="product.quantity"
              type="number"
              required
              min="1"
            />
          </div>

          <button
            type="button"
            @click="removeProduct(index)"
            class="remove-btn"
            v-if="transaction.product.length > 1"
          >
            Remove
          </button>
        </div>

        <button type="button" @click="addProduct" class="add-btn">Add Product</button>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Creating...' : 'Create Transaction' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import { useRouter } from 'vue-router'

export default {
  name: 'CreateTransactionView',
  setup() {
    const router = useRouter()
    const transactionStore = useTransactionStore()
    const loading = ref(false)
    const error = ref(null)

    const transaction = ref({
      invoiceNo: '',
      date: '',
      customer: '',
      product: [
        {
          productCode: '',
          quantity: 1,
        },
      ],
    })

    const addProduct = () => {
      transaction.value.product.push({
        productCode: '',
        quantity: 1,
      })
    }

    const removeProduct = (index) => {
      transaction.value.product.splice(index, 1)
    }

    const handleSubmit = async () => {
      try {
        loading.value = true
        error.value = null
        await transactionStore.createTransaction(transaction.value)
        router.push('/') // Redirect to transactions list after successful creation
      } catch (err) {
        error.value = err.message || 'Failed to create transaction'
      } finally {
        loading.value = false
      }
    }

    return {
      transaction,
      loading,
      error,
      addProduct,
      removeProduct,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.create-transaction {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.error {
  color: #dc3545;
  padding: 20px;
  text-align: center;
  background-color: #f8d7da;
  border-radius: 4px;
  margin: 20px 0;
}

.transaction-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
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

.products-section {
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
}

.product-item {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 20px;
  padding: 15px;
  background: white;
  border-radius: 4px;
  margin-bottom: 10px;
}

.add-btn,
.remove-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.add-btn {
  background: #28a745;
  color: white;
  width: 100%;
  margin-top: 10px;
}

.remove-btn {
  background: #dc3545;
  color: white;
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
</style>
