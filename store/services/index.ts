import {
  createApi,
  fetchBaseQuery,

} from "@reduxjs/toolkit/query/react";

import {
  relatedPins,
  userProfile,
  popularTopics,
  popularArticles,
} from "../../mocks";
import { Pin, UserProfile, PinTopic, Article } from "../../types";
export interface SearchPinsArgs {
  searchQuery: string;
  tags: string[];
  take?: Number;
  skip?: number;
}

export interface SearchPinsData {
  total: number;
  result: Pin[];
  suggestedTags: string[];
}
export const appAPI = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getPins: builder.query<SearchPinsData, SearchPinsArgs>({
      queryFn: ({ searchQuery, tags }) => {
        setTimeout(() => {}, 6 * 1000);
        const cleanQuery = searchQuery.trim().toLowerCase();
        /// filter by query
        const matches = relatedPins.filter((pin) =>
          pin.tags.some((tag) => cleanQuery?.includes(tag)),
        );
        if (!matches.length)
          return {
            data: {
              total: 0,
              result: [],
              suggestedTags: [],
            } as SearchPinsData,
          };

        //// filter by tag
        const pins = !tags.length
          ? matches
          : matches.filter((pin) =>
              tags.every((tag) => pin.tags.includes(tag)),
            );
        const suggestedTags = [
          ...new Set(
            pins.reduce((array: string[], current: Pin) => {
              return [...array, ...current.tags];
            }, []),
          ),
        ];

        return {
          data: {
            total: pins.length,
            result: pins,
            suggestedTags,
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
    getTodayPopularTopics: builder.query<PinTopic[], void>({
      queryFn: () => {
        setTimeout(() => {}, 6 * 1000);
        return { data: popularTopics };
      },
    }),
    getTodayPopularArticles: builder.query<Article[], { take?: number }>({
      queryFn: () => {
        setTimeout(() => {}, 6 * 1000);
        return { data: popularArticles };
      },
    }),
    getTodayPopularPins: builder.query<Pin[], { take?: number }>({
      queryFn: () => {
        setTimeout(() => {}, 6 * 1000);
        return { data: relatedPins };
      },
    }),
    getPin: builder.query<Pin, number>({
      queryFn: (id) => {
        setTimeout(() => {}, 6 * 1000);
        const foundPin = relatedPins.find((pin) => pin.id === id);
        if (!foundPin)
          return {
            error: {
              status: 404,
              statusText: "NOT FOUND",
              data: "No pin was found",
            },
          };
        return { data: foundPin };
      },
    }),
    getPinsByTags: builder.query<Pin[], { tags: string[]; refererId: number }>({
      queryFn: ({ tags, refererId }) => {
        setTimeout(() => {}, 6 * 1000);
        const matches = relatedPins.filter(
          (pin) =>
            pin.tags.some((tag) => tags.includes(tag)) && pin.id !== refererId,
        );

        return { data: matches };
      },
    }),
  }),
});
export const {
  useGetUserProfileQuery,
  useGetTodayPopularTopicsQuery,
  useGetTodayPopularPinsQuery,
  useGetTodayPopularArticlesQuery,
  useLazyGetPinsQuery,
  useGetPinQuery,
  useLazyGetPinsByTagsQuery,
} = appAPI;
