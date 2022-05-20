/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: undefined;
  Pin: { id: number };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Search: undefined;
  Account: undefined;
  Home: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface Pin {
  id: number;
  pin: string;
  title?: string;
  tags: string[];
  collection?: { id: number; name: string };
  author?: {
    id: number;
    user_name: string;
    avatar: string;
  };
}

export interface PinBoard {
  id: number;
  name: string;
  pinsCount: number;
  updatedAt: string;
  thumbnails: string[];
}
export interface UserProfile {
  user_name: string;
  full_name: string;
  email: string;
  avatar?: string;
  followersCount: number;
  followingCount: number;
  pin_boards: PinBoard[];
  created_pins: Pin[];
}
export interface PinTopic {

  name: string;
  thumbnail: string;
}
export interface Article extends PinTopic {
  id: number;
}