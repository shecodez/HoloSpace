import { IUser } from './interfaces';
import { setDate, subDays, subMonths } from 'date-fns';

const today = new Date();

function thisMonth(d: number, h: number, m: number) {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
}

export enum SpaceType {
  TEXT = 'TEXT',
  VOIP = 'VOIP',
  H010 = 'H010',
}

// 'TEXT' | 'markdown' | 'image' | 'file' | 'sticker' | 'REMOVED' | 'VOICE' | 'H010';
export enum MessageType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  H010 = 'H010',
  Markdown = 'markdown',
  Image = 'image',
  File = 'file',
  Sticker = 'sticker',
  REMOVED = 'REMOVED',
}

export enum OnlineStatus {
  SHOW = 'SHOW',
  AWAY = 'AWAY',
  BRB = 'BRB',
  BUSY = 'BUSY',
  DND = 'DND',
  HIDE = 'HIDE',
}

export enum PasswordStrength {
  VERY_WEAK = 0,
  WEAK = 10,
  GOOD = 20,
  STRONG = 30,
  VERY_STRONG = 40,
  OVER_9000 = 50,
}

export enum Region {
  US_EAST = 'US-East',
  JP_ASIA = 'JP-Asia',
}

export const decks = [
  {
    id: '1',
    name: 'Resume | NJN',
    boot_space_id: '1',
    captain_id: '1',
    hq: Region.US_EAST,
    created_at: today,
  },
  { id: '2', name: '이거 매워요?', boot_space_id: '6', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  { id: '3', name: '見ぬが花', boot_space_id: '7', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '4', name: 'Deck 4', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '5', name: 'Deck 5', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '6', name: 'Deck 6', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '7', name: 'Deck 7', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '8', name: 'Deck 8', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '9', name: 'Deck 9', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '14', name: 'Deck 14', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '15', name: 'Deck 15', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '16', name: 'Deck 16', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '17', name: 'Deck 17', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '18', name: 'Deck 18', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '19', name: 'Deck 19', boot_space_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
];

export const spaces = [
  {
    id: '1',
    deck_id: '1',
    is_private: false,
    name: 'Init Space',
    topic: 'rawr',
    type: SpaceType.TEXT,
    can_delete: false,
    created_at: today,
  },
  {
    id: '2',
    deck_id: '1',
    is_private: false,
    name: 'Education',
    type: SpaceType.TEXT,
    can_delete: false,
    created_at: today,
  },
  {
    id: '3',
    deck_id: '1',
    is_private: false,
    name: 'Experience',
    type: SpaceType.TEXT,
    can_delete: true,
    created_at: today,
  },
  {
    id: '4',
    deck_id: '1',
    is_private: false,
    name: 'The Voice',
    type: SpaceType.VOIP,
    can_delete: true,
    created_at: today,
  },
  {
    id: '5',
    deck_id: '1',
    is_private: false,
    name: 'Holodeck 18',
    type: SpaceType.H010,
    h010space_id: '1',
    can_delete: true,
    created_at: today,
  },
  {
    id: '6',
    deck_id: '2',
    is_private: false,
    name: 'init',
    type: SpaceType.TEXT,
    can_delete: false,
    created_at: today,
  },
  {
    id: '7',
    deck_id: '3',
    is_private: false,
    name: 'init',
    type: SpaceType.TEXT,
    can_delete: false,
    created_at: today,
  },
  {
    id: '8',
    name: "shecodez's team-xi9dj7",
    leader_id: '1',
    is_private: true,
    type: SpaceType.TEXT,
    can_delete: true,
    created_at: today,
  },
  {
    id: '9',
    name: 'team-gu9skf',
    leader_id: '1',
    is_private: true,
    type: SpaceType.H010,
    can_delete: true,
    created_at: today,
  },
];

export const memberships = [];
export const subscriptions = [];
export const friendships = [];

export const users = [
  {
    id: '0',
    name: 'Guest',
    pin: 1234,
    is_online: true,
    status: OnlineStatus.SHOW,
    created_at: subMonths(today, 1),
  },
  {
    id: '1',
    name: 'shecodez',
    pin: 1337,
    is_online: true,
    status: OnlineStatus.SHOW,
    image_url: 'https://heipqgxfpjhqerywembc.supabase.in/storage/v1/object/public/avatars/shecodez-njn.jpg',
    created_at: subDays(today, 11),
  },
  {
    id: '010',
    name: 'VViFi',
    pin: '010',
    is_online: true,
    status: OnlineStatus.SHOW,
    created_at: subDays(today, 11),
  },
  {
    id: '2',
    name: '龍ハヤブサ',
    pin: 6323,
    is_online: true,
    status: OnlineStatus.BUSY,
    created_at: subMonths(today, 8),
  },
  {
    id: '3',
    name: 'Kai',
    pin: 3469,
    is_online: true,
    status: OnlineStatus.HIDE,
    created_at: subDays(today, 24),
  },
  {
    id: '4',
    name: 'WillIAm',
    pin: 2052,
    is_online: true,
    status: OnlineStatus.AWAY,
    image_url: 'https://randomuser.me/api/portraits/men/45.jpg',
    created_at: subDays(today, 5),
  },
  {
    id: '5',
    name: '山田太郎',
    pin: 4284,
    is_online: false,
    status: OnlineStatus.SHOW,
    created_at: subDays(today, 14),
  },
  {
    id: '6',
    name: '홍길동',
    pin: 9282,
    is_online: true,
    status: OnlineStatus.SHOW,
    created_at: subMonths(today, 3),
  },
  {
    id: '7',
    name: 'IronMan',
    pin: 5353,
    is_online: false,
    status: OnlineStatus.SHOW,
    created_at: subDays(today, 9),
  },
];

export const teams = [
  {
    space_id: '4',
    users: [users[5], users[6], users[3]] as IUser[],
  },
  {
    space_id: '5',
    users: [users[4], users[7]] as IUser[],
  },
];

export const messages = [
  {
    id: '0',
    author_id: '0',
    author: {
      name: 'Guest',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 11),
    content: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
    type: MessageType.TEXT,
  },
  {
    id: '1',
    author_id: '1',
    author: {
      name: 'Niico',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 10),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
    type: MessageType.TEXT,
  },
  {
    id: '2',
    author_id: '2',
    author: {
      name: '龍ハヤブサ',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 10),
    content: 'Do you have Paris recommendations? Have you ever been?',
    type: MessageType.TEXT,
  },
  {
    id: '22',
    author_id: '2',
    author: {
      name: '龍ハヤブサ',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 9),
    content: "Nvm, I'll just wing it. :)",
    type: MessageType.TEXT,
  },
  {
    id: '3',
    author_id: '3',
    author: {
      name: 'Kai',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 8),
    updated_at: subDays(today, 7),
    content: 'Have any ideas about what we should get Heidi for her birthday?',
    type: MessageType.TEXT,
  },
  {
    id: '4',
    author_id: '5',
    author: {
      name: '홍길동',
    },
    space_id: '1',
    created_at: subDays(today, 7),
    content:
      '`@Kai` We should eat this: Grate, Squash, Corn, and tomatillo Tacos. Also ~~The world is flat.~~ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
    type: MessageType.Markdown,
  },
  {
    id: '5',
    author_id: '4',
    author: {
      name: 'WillIAm',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 6),
    updated_at: subDays(today, 5),
    content: '`@홍길동`~~Hell~~ No',
    type: MessageType.Markdown,
  },
  {
    id: '6',
    author_id: '1',
    author: {
      name: 'Niico',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 4),
    content: 'This is great.',
    type: MessageType.TEXT,
  },
  {
    id: '7',
    author_id: '1',
    author: {
      name: 'Niico',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 4),
    content:
      'Just Fantastic! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
    type: MessageType.TEXT,
  },
  {
    id: '8',
    author_id: '3',
    author: {
      name: 'Kai',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 3),
    content: "<span class='text--primary'>@홍길동 </span> We should eat MEAT!!!!11 :d",
    type: MessageType.TEXT,
  },
  {
    id: '9',
    author_id: '3',
    author: {
      name: 'Kai',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 1),
    content: 'I got some Kobe beef!!!',
    type: MessageType.TEXT,
  },
  {
    id: '10',
    author_id: '4',
    author: {
      name: 'WillIAm',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    },
    space_id: '1',
    created_at: subDays(today, 0),
    content: '`Thatz whatz up!',
    type: MessageType.TEXT,
  },
];

// TODO: must transform event from db:
// { db.start_date -> startDate, db.end_date -> endDate, db.name -> title, db.color -> classes }
export const events = [
  {
    id: 'e0',
    startDate: setDate(today, 1),
  },
  {
    id: 'e1',
    startDate: thisMonth(15, 18, 30), // 18:30
  },
  {
    id: 'e2',
    startDate: setDate(today, 15),
    title: 'Single-day item with a long title',
  },
  {
    id: 'e3',
    startDate: thisMonth(7, 9, 25), // 9:25
    endDate: thisMonth(10, 16, 30), // 16:30
    title: 'Multi-day item with a long title and times',
  },
  {
    id: 'e4',
    startDate: setDate(today, 20),
    title: 'My Birthday!',
    classes: 'birthday',
    url: 'https://en.wikipedia.org/wiki/Birthday',
  },
  {
    id: 'e5',
    startDate: setDate(today, 5),
    endDate: setDate(today, 12),
    title: 'Multi-day item',
    classes: 'purple',
  },
  {
    id: 'foo',
    startDate: setDate(today, 29),
    title: 'Same day 1',
  },
  {
    id: 'e6',
    startDate: setDate(today, 29),
    title: 'Same day 2',
    classes: 'orange',
  },
  {
    id: 'e7',
    startDate: setDate(today, 29),
    title: 'Same day 3',
  },
  {
    id: 'e8',
    startDate: setDate(today, 29),
    title: 'Same day 4',
    classes: 'orange',
  },
  {
    id: 'e9',
    startDate: setDate(today, 29),
    title: 'Same day 5',
  },
  {
    id: 'e10',
    startDate: setDate(today, 29),
    title: 'Same day 6',
    classes: 'orange',
  },
  {
    id: 'e11',
    startDate: setDate(today, 29),
    title: 'Same day 7',
  },
];
