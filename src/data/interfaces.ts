import { SpaceType, OnlineStatus, Region, MessageType } from './mock';

export type BannerType = 'error' | 'info' | 'success' | 'warning';
export type ToastType = 'danger' | 'info' | 'success' | 'warning';

export type StringOrNumber = string | number;

// -- emoji picker --------------------------------
export interface NativeEmoji {
  annotation: string;
  emoticon?: string;
  group: number;
  name: string;
  order: number;
  shortcodes?: string[];
  tags?: string[];
  version: number;
  unicode: string;
  skins?: EmojiSkin[];
}
export interface EmojiSkin {
  tone: SkinTone;
  unicode: string;
  version: number;
}

export interface CustomEmoji {
  name: string;
  shortcodes?: string[];
  url: string;
  category?: string;
}

export declare type Emoji = NativeEmoji | CustomEmoji;

export enum SkinTone {
  Default = 0,
  Light = 1,
  MediumLight = 2,
  Medium = 3,
  MediumDark = 4,
  Dark = 5,
}

export interface EmojiClickEventDetail {
  emoji: Emoji;
  skinTone: SkinTone;
  unicode?: string;
  name?: string;
}
// ------------------------------------------

export interface IGif {
  id: string | number;
  name: string;
  URL: string;
}

export interface IAuth {
  username?: string; // meta
  email: string;
  password?: string;
}

export interface IVec3 {
  x: number;
  y: number;
  z: number;
}

export interface IClient {
  id: string;

  h010tag: string;
  space_id: string; // TODO: change to ISpace

  modelURL: string;
  model?: any; // pc.Entity

  position?: IVec3;
  rotation?: IVec3;

  isDeleted?: boolean;
}

export interface IUser {
  id: string;

  name: string;
  pin: number | string;
  //h010tag: `${name}#${pin}`
  imageURL?: string;
  modelURL?: string;
  isOnline: boolean;
  status: OnlineStatus;

  createdAt: Date;
  updatedAt?: Date;
}

export interface IProfile {
  id: string;

  bio: string;
}

export interface IEvent {
  id: string;

  title: string; // name
  description?: string;
  url?: string;
  startDate: Date;
  endDate?: Date;
  classes?: string; // color
}

export interface IDeck {
  id: string;

  name: string;
  imageURL?: string;
  user_id: string;
  initSpace_id: string;
  hq?: Region; // default Region.US_EAST
  crew?: IUser[]; // crew members

  createdAt: Date;
  updatedAt?: Date;
  updatedBy_id?: string; // string of uids
}

export interface ISpace {
  id: string;

  name: string;
  topic?: string;
  type: SpaceType;
  h010_id?: string; // if type = H010
  isPrivate: boolean; // default false
  team?: IUser[]; // team members *only if isPrivate = true
  typingUser_ids?: string[];
  user_id?: string;
  deck_id?: string;
  canDelete: boolean; // ex: cannot delete boot disk

  createdAt: Date;
  updatedAt?: Date;
  updatedBy_id?: string; // string of uids
}

export interface IMessageAuthor {
  name: string;
  //pin: number | string;
  //h010tag: `${name}#${pin}`
  imageURL?: string;
  modelURL?: string;
}

export interface IMessageReactions {
  [key: string]: StringOrNumber[];
}

export interface IFile {
  id?: string;

  name: string;
  type: string; // .mp3 .wav .img .png .jpg .gif .doc(x) .pdf .zip .txt .h010
  url: string;
  preview: string;
  size?: number;
  audio?: boolean;
  duration?: number;
  progress?: number;

  message_id?: string;
  space_id?: string;

  createdAt: Date;
  updatedAt?: Date;
}

export interface IMessageMetaData {
  system?: boolean;
  saved?: boolean;
  distributed?: boolean;
  seen?: boolean;
  deleted?: boolean;
  failure?: boolean;
  disableActions?: boolean;
  disableReactions?: boolean;
}

export interface IMessage {
  id?: string;

  user_id: string;
  author?: IMessageAuthor;
  space_id: string;
  content: string;
  replyTo_id?: string;
  replyMessage?: IMessage;
  file_id?: string;
  files?: IFile[];
  type: MessageType;
  reactions?: IMessageReactions;
  metaData?: IMessageMetaData;

  createdAt: Date;
  updatedAt?: Date;

  deletedBy_id?: string;
}
