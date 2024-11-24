# 🎨 Transactify Client

Frontend application for Transactify built with Vue 3 and Vite.

## ✨ Features

- 📊 Transaction Management
- 🏷️ Product Management
- 📱 Responsive Design
- 🔄 Real-time Updates
- 🎯 State Management with Pinia

## 🛠️ Tech Stack

- Vue 3 (Composition API)
- Vite
- Pinia for State Management
- Vue Router
- Axios for API calls
- ESLint + Prettier

## 💻 Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [Volar Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Disable Vetur if installed

### Installation Steps

1. Install dependencies

```bash
yarn
```

2. Start development server

```bash
yarn dev
```

3. Build for production

```bash
yarn build
```

4. Lint files

```bash
yarn lint
```

## 📁 Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable Vue components
├── views/         # Page components
├── stores/        # Pinia stores
├── plugins/       # Vue plugins
├── router/        # Vue Router configuration
└── App.vue        # Root component
```

## 🔗 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

## 📦 Building for Production

```bash
yarn build
```

The built files will be in the `dist` directory.

## 🧪 Testing

```bash
yarn test
```

## 📝 Additional Notes

- The application uses Vue 3's Composition API
- State management is handled by Pinia
- API calls are made using Axios
- Styling uses scoped CSS with optional SCSS
