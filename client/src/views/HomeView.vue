<!-- <template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ user?.name }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const authStore = useAuthStore()
    const { user, logout } = authStore

    return { user, logout }
  },
}
</script> -->

<!-- HomeView.vue -->
<template>
  <div class="home">
    <h1>Transactions List</h1>

    <div v-if="loading" class="loading">Loading transactions...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="transactions.length === 0" class="no-data">No transactions found.</div>

      <div v-else class="transactions-list">
        <div v-for="transaction in transactions" :key="transaction.id" class="transaction-card">
          <div class="transaction-header">
            <h3>Invoice: {{ transaction.invoiceNo }}</h3>
            <span class="date">{{ formatDate(transaction.date) }}</span>
          </div>

          <div class="customer-info">
            <p>Customer: {{ transaction.customer }}</p>
          </div>

          <div class="items-section">
            <h4>Items:</h4>
            <div class="items-table">
              <table>
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in transaction.TransactionItems" :key="item.id">
                    <td>{{ item.productCode }}</td>
                    <td>{{ item.quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="transaction-footer">
            <span class="created-at">Created: {{ formatDateTime(transaction.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTransactionStore } from '../stores/transaction'

export default {
  name: 'HomeView',
  setup() {
    const transactionStore = useTransactionStore()
    return { transactionStore }
  },
  computed: {
    transactions() {
      return this.transactionStore.transactions
    },
    loading() {
      return this.transactionStore.loading
    },
    error() {
      return this.transactionStore.error
    },
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
  beforeRouteEnter(to, from, next) {
    const transactionStore = useTransactionStore()

    if (from.name === 'Login') {
      // Force reload the page
      window.location.reload()
    } else {
      // Fetch transactions and proceed with navigation
      transactionStore
        .fetchTransactions()
        .then(() => next())
        .catch((err) => {
          console.error('Failed to fetch transactions:', err)
          next()
        })
    }
  },
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
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

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.transactions-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.transaction-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.transaction-header h3 {
  margin: 0;
  color: #2c3e50;
}

.date {
  color: #666;
  font-size: 0.9em;
}

.customer-info {
  margin-bottom: 15px;
}

.customer-info p {
  margin: 5px 0;
  color: #444;
}

.items-section {
  margin: 15px 0;
}

.items-section h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.items-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.transaction-footer {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  text-align: right;
}

.created-at {
  font-size: 0.85em;
  color: #666;
}
</style>
