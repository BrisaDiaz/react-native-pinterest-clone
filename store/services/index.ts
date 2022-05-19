import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { relatedPins, userProfile } from "../../mocks";
import { Pin, UserProfile } from "../../types";
export interface SearchPinsArgs {
  searchQuery: string;
  tags: string[];
}

export interface SearchPinsData {
  total: number;
  result: Pin[];
}
export const appAPI = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getPins: builder.query<SearchPinsData, SearchPinsArgs>({
      queryFn: ({ searchQuery, tags }) => {
        setTimeout(() => {}, 6 * 1000);
        return {
          data: {
            total: relatedPins.length,
            result: relatedPins,
          } as SearchPinsData,
        };
      },
    }),
    getUserProfile: builder.query<UserProfile, void>({
      queryFn: () => {
        setTimeout(() => {}, 6 * 1000);
        return {
          data: userProfile as UserProfile,
        };
      },
    }),
  }),
});
export const { useGetUserProfileQuery, useLazyGetPinsQuery } = appAPI;
