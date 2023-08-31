import { appApi } from "..";

const authApi = appApi
  .enhanceEndpoints({
    addTagTypes: ["Auth"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      login: build.mutation({
        query: (payload) => ({
          url: "/auth/login",
          body: payload,
          method: "Post",
        }),
      }),
      foodCategoryById: build.query({
        query: (resturantId) => ({
          url: `food-category/${resturantId}`,
          method: "Get",
        }),
      }),
      foodItemByCategoryId: build.query({
        query: (categoryId) => ({
          url: `food-item/${categoryId}`,
          method: "Get",
        }),
      }),
      ordersByRestaurantId: build.query({
        providesTags: [{ id: "auth", type: "Kitchen-Order" }],
        query: (restaurantId) => ({
          url: `orders/${restaurantId}`,
          method: "Get",
        }),
      }),
      allOrdersByRestaurantId: build.query({
        query: (restaurantId) => ({
          url: `orders/all-orders/${restaurantId}`,
          method: "Get",
        }),
      }),
      orderBook: build.mutation({
        query: (payload) => ({
          url: "orders",
          body: payload,
          method: "Post",
        }),
      }),
      updateOrderBook: build.mutation({
        query: ({ orderId, payload }) => ({
          url: `orders/${orderId}`,
          body: payload,
          method: "PATCH",
        }),
        invalidatesTags: () => [{ id: "auth", type: "Kitchen-Order" }],
      }),
    }),
  });

export const {
  useLoginMutation,
  useFoodCategoryByIdQuery,
  useFoodItemByCategoryIdQuery,
  useLazyFoodItemByCategoryIdQuery,
  useOrdersByRestaurantIdQuery,
  useAllOrdersByRestaurantIdQuery,
  useOrderBookMutation,
  useUpdateOrderBookMutation,
} = authApi;
