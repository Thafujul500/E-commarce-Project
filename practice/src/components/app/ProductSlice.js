import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [
    {
      id: 1,
      model: "iPhone 14",
      price: 999,
      quantity: 1,
      status: true,
      copies: 6,
    },
    {
      id: 2,
      model: "Samsung Galaxy S23",
      price: 899,
      quantity: 1,
      status: true,
      copies: 3,
    },
    {
      id: 3,
      model: "Dell Ultrasharp Monitor",
      price: 299,
      quantity: 1,
      status: true,
      copies: 7,
    },
    {
      id: 4,
      model: "Logitech MX Master 3S Mouse",
      price: 99,
      quantity: 1,
      status: true,
      copies: 7,
    },
    {
      id: 5,
      model: "Corsair K95 RGB Keyboard",
      price: 199,
      quantity: 1,
      status: true,
      copies: 5,
    },
    {
      id: 6,
      model: "Sony WH-1000XM5 Headphones",
      price: 349,
      quantity: 1,
      status: true,
      copies: 6,
    },
    {
      id: 7,
      model: "Apple MacBook Air M2",
      price: 1199,
      quantity: 1,
      status: true,
      copies: 7,
    },
    {
      id: 8,
      model: "Lenovo ThinkPad X1 Carbon",
      price: 1599,
      quantity: 1,
      status: true,
      copies: 1,
    },
    {
      id: 9,
      model: "ASUS ROG Strix Gaming Laptop",
      price: 1899,
      quantity: 1,
      status: true,
      copies: 10,
    },
    {
      id: 10,
      model: "Western Digital 2TB External HDD",
      price: 99,
      quantity: 1,
      status: true,
      copies: 33,
    },
    {
      id: 11,
      model: "Google Pixel 8 Pro",
      price: 999,
      quantity: 1,
      status: true,
      copies: 19,
    },
    {
      id: 12,
      model: "Microsoft Surface Laptop Studio",
      price: 1599,
      quantity: 1,
      status: true,
      copies: 40,
    },
    {
      id: 13,
      model: "HyperX Cloud Alpha Wireless Headset",
      price: 199,
      quantity: 1,
      status: true,
      copies: 13,
    },
    {
      id: 14,
      model: "Samsung T7 1TB Portable SSD",
      price: 129,
      quantity: 1,
      status: true,
      copies: 27,
    },
    {
      id: 15,
      model: "Apple Watch Ultra",
      price: 799,
      quantity: 1,
      status: true,
      copies: 21,
    },
    {
      id: 16,
      model: "Sony Alpha a6400 Mirrorless Camera",
      price: 899,
      quantity: 1,
      status: true,
      copies: 5,
    },
    {
      id: 17,
      model: "HP Envy x360 2-in-1 Laptop",
      price: 1099,
      quantity: 1,
      status: true,
      copies: 37,
    },
    {
      id: 18,
      model: "Anker PowerCore 26800mAh Power Bank",
      price: 65,
      quantity: 1,
      status: true,
      copies: 20,
    },
    {
      id: 19,
      model: "Fitbit Charge 6",
      price: 129,
      quantity: 1,
      status: true,
      copies: 31,
    },
    {
      id: 20,
      model: "Bose SoundLink Revolve+ Speaker",
      price: 329,
      quantity: 1,
      status: true,
      copies: 14,
    },
    {
      id: 21,
      model: "Razer DeathAdder V3 Pro Mouse",
      price: 149,
      quantity: 1,
      status: true,
      copies: 9,
    },
    {
      id: 22,
      model: "Seagate FireCuda 530 1TB SSD",
      price: 169,
      quantity: 1,
      status: true,
      copies: 30,
    },
    {
      id: 23,
      model: "Canon EOS R50 Camera",
      price: 699,
      quantity: 1,
      status: true,
      copies: 11,
    },
    {
      id: 24,
      model: "NVIDIA Shield TV Pro",
      price: 199,
      quantity: 1,
      status: true,
      copies: 18,
    },
    {
      id: 25,
      model: "JBL Flip 6 Bluetooth Speaker",
      price: 129,
      quantity: 1,
      status: true,
      copies: 35,
    },
    {
      id: 26,
      model: "Garmin Forerunner 255 GPS Watch",
      price: 349,
      quantity: 1,
      status: true,
      copies: 25,
    },
    {
      id: 27,
      model: "Acer Predator XB273K Gaming Monitor",
      price: 999,
      quantity: 1,
      status: true,
      copies: 16,
    },
    {
      id: 28,
      model: "SteelSeries Apex Pro TKL Keyboard",
      price: 179,
      quantity: 1,
      status: true,
      copies: 24,
    },
    {
      id: 29,
      model: "Ring Video Doorbell 4",
      price: 219,
      quantity: 1,
      status: true,
      copies: 29,
    },
    {
      id: 30,
      model: "DJI Mini 3 Pro Drone",
      price: 759,
      quantity: 1,
      status: true,
      copies: 6,
    },
    {
      id: 31,
      model: "Motorola Edge 50",
      price: 322,
      quantity: 1,
      status: true,
      copies: 22,
    },
    {
      id: 32,
      model: "Xiaomi 14 Ultra",
      price: 610,
      quantity: 1,
      status: true,
      copies: 41,
    },
  ],
  selectedProducts: (() => {
    try {
      const stored = localStorage.getItem("selectedProducts");
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (e) {
      console.error("Error parsing selected products:", e);
      return [];
    }
  })(),
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addSelectedProdects: (state, action) => {
      state.selectedProducts.push(action.payload);
      const productIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      state.products[productIndex].status =
        !state.products[productIndex].status;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    selectedProductDelete: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.id !== action.payload
      );
      const productIndex = state.products.findIndex(
        (item) => item.id === action.payload
      );
      state.products[productIndex].status =
        !state.products[productIndex].status;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    productQuantityIncrement: (state, action) => {
      const productIndex = state.products.findIndex(
        (item) => item.id === action.payload
      );
      state.products[productIndex].quantity++;
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    productQuantityDecrement: (state, action) => {
      const productIndex = state.products.findIndex(
        (item) => item.id === action.payload
      );
      state.products[productIndex].quantity--;
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    selectedProductQuantityIncrement: (state, action) => {
      const productIndex = state.selectedProducts.findIndex(
        (item) => item.id === action.payload
      );
      state.selectedProducts[productIndex].quantity++;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    selectedProductQuantityDecrement: (state, action) => {
      const productIndex = state.selectedProducts.findIndex(
        (item) => item.id === action.payload
      );
      state.selectedProducts[productIndex].quantity--;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
  },
});

export const {
  addSelectedProdects,
  selectedProductDelete,
  productQuantityIncrement,
  productQuantityDecrement,
  selectedProductQuantityIncrement,
  selectedProductQuantityDecrement,
} = productSlice.actions;

export default productSlice.reducer;
