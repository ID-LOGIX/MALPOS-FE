import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Initialize an empty api service that we'll inject endpoints into later as needed
export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://127.0.0.1:8000/api/",
    baseUrl: "http://idlogix.utis.pk:8089/malpos-api/public/api/",
    // prepareHeaders: (headers, { getState, endpoint }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});

// http://idlogix.utis.pk:7078/
