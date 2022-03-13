import { SpaceType, OnlineStatus, Region, MessageType } from './mock';

export type BannerType = 'error' | 'info' | 'success' | 'warning';
export type ToastType = 'danger' | 'info' | 'success' | 'warning';

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

export interface IFile {
  id?: string;

  name: string;
  size: number;

  message_id?: string;
}

export interface IMessage {
  id?: string;

  user_id: string;
  author?: IMessageAuthor;
  space_id: string;
  content: string;
  replyTo_id?: string;
  file_id?: string;
  file?: IFile; // .mp3 .wav .img .png .jpg .gif .doc(x) .pdf .zip .txt .h010
  type: MessageType;
  reactions?: {
    [key: string]: number;
  };

  createdAt: Date;
  updatedAt?: Date;

  deletedBy_id?: string;
}
