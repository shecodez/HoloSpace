import { DiskspaceType, OnlineStatus, Region } from './mock';

export interface IUser {
  id: string;

  name: string;
  pin: number | string;
  //h010tag: `${name}#${pin}`
  image_url?: string;
  model_url?: string;
  is_online: boolean;
  status: OnlineStatus;

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

export interface IEvent {
  id: string;

  title: string;
  url?: string; // details
  startDate: Date;
  endDate?: Date;
  classes?: string; // color
}

export interface IDeck {
  id: string;

  name: string;
  image_url?: string;
  captain_id: string;
  boot_disk_id: string;
  hq?: Region; // default Region.US_EAST
  crew?: IUser[]; // crew members

  created_at: Date;
  updated_at?: Date;
  updated_by?: string; // string of uids
}

export interface IDiskspace {
  id: string;

  name: string;
  topic?: string;
  type: DiskspaceType;
  h010space_id?: string; // if type = H010
  is_ssh: boolean; // default false
  user_id?: string;
  deck_id?: string;
  can_delete: boolean; // ex: cannot delete boot disk
  team?: IUser[]; //team members *only if is_ssh = true

  created_at: Date;
  updated_at?: Date;
  updated_by?: string; // string of uids
}

export interface IMessageReaction {
  emoji: string;
  count: number;
}

export interface IMessage {
  id: string;

  attachments?: string; // .mp3 .wav .img .png .jpg .gif .doc(x) .pdf .zip .txt
  user_id: string;
  author?: IMessageAuthor;
  diskspace_id: string;
  reactions?: IMessageReaction[];
  reply_id?: string;

  created_at: Date;
  updated_at?: Date;
  deleted_by?: string;
}

export interface ITextMessage extends IMessage {
  text: string;
  is_markdown?: boolean;
}

export interface IVoiceMessage extends IMessage {
  audio_url: string;
}

export interface IH010Message extends IMessage {
  h010gram_url: string; // .h010 file
}
