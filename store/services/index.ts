import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { relatedPins, userProfile, popularTopics } from "../../mocks";
import { Pin, UserProfile, PinTopic } from "../../types";
export interface SearchPinsArgs {
  searchQuery: string;
  tags: string[];
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
        if (!searchQuery.toLocaleLowerCase().includes("hair"))
          return {
            data: {
              total: 0,
              result: [],
              suggestedTags: [],
            } as SearchPinsData,
          };

        setTimeout(() => {}, 6 * 1000);
        const pins = !tags.length
          ? relatedPins
          : relatedPins.filter((pin) =>
              pin.tags.some((tag) => tags.includes(tag)),
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
    getPopularTopics: builder.query<PinTopic[], void>({
      queryFn: () => {
        setTimeout(() => {}, 6 * 1000);
        return { data: popularTopics };
      },
    }),
  }),
});
export const {
  useGetUserProfileQuery,
  useGetPopularTopicsQuery,
  useLazyGetPinsQuery,
} = appAPI;
