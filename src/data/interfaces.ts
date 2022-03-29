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

export interface IAuthLogin {
  email: string;
  password: string;
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

  model_url: string;
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
  image_url?: string;
  model_url?: string;
  is_online?: boolean;
  status?: OnlineStatus;

  created_at: Date;
  updated_at?: Date;
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
  start_date: Date;
  end_date?: Date;
  classes?: string; // color
}

export interface IDeck {
  id: string;

  name: string;
  image_url?: string;
  captain_id: string;
  boot_space_id: string;
  hq?: Region; // default Region.US_EAST
  crew_ids?: string[];
  crew?: IUser[]; // crew members

  created_at: Date;
  updated_at?: Date;
}

export interface ISpace {
  id: string;

  name: string;
  topic?: string;
  type: SpaceType;
  h010space_id?: string; // if type = H010
  is_private: boolean; // default false
  team_ids?: string[];
  team?: IUser[]; // team members *only if is_private = true
  usersTyping?: IUser[];
  usersSpeaking?: IUser[];
  leader_id?: string;
  deck_id?: string;
  can_delete: boolean; // ex: cannot delete boot disk

  created_at: Date;
  updated_at?: Date;
}

export interface IMessageAuthor {
  name: string;
  //pin: number | string;
  //h010tag: `${name}#${pin}`
  image_url?: string;
  model_url?: string;
}

export interface IMessageReaction {
  emoji: string;
  message_id: StringOrNumber;
  user_id: string;
  user?: { name: string };
  messages?: { space_id: string };
  username?: string;
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

  created_at: Date;
  updated_at?: Date;
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

export const IMessageType = MessageType;

export interface IMessage {
  id?: string;

  author_id: string;
  author?: Partial<IUser>; //IMessageAuthor;
  space_id: string;
  content: string;
  reply_to_id?: string;
  replyMessage?: IMessage;
  file_id?: string;
  files?: IFile[];
  type: MessageType;
  reactions?: IMessageReactions;
  metaData?: IMessageMetaData;

  created_at: Date;
  updated_at?: Date;
}
