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
    initSpace_id: '1',
    user_id: '1',
    hq: Region.US_EAST,
    createdAt: today,
  },
  { id: '2', name: '이거 매워요?', initSpace_id: '6', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  { id: '3', name: '見ぬが花', initSpace_id: '7', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '4', name: 'Deck 4', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '5', name: 'Deck 5', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '6', name: 'Deck 6', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '7', name: 'Deck 7', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '8', name: 'Deck 8', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '9', name: 'Deck 9', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '14', name: 'Deck 14', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '15', name: 'Deck 15', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '16', name: 'Deck 16', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '17', name: 'Deck 17', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '18', name: 'Deck 18', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
  // { id: '19', name: 'Deck 19', initSpace_id: '1', user_id: '1', hq: Region.JP_ASIA, createdAt: today },
];

export const spaces = [
  {
    id: '1',
    deck_id: '1',
    isPrivate: false,
    name: 'Init Space',
    topic: 'rawr',
    type: SpaceType.TEXT,
    canDelete: false,
    createdAt: today,
  },
  {
    id: '2',
    deck_id: '1',
    isPrivate: false,
    name: 'Education',
    type: SpaceType.TEXT,
    canDelete: false,
    createdAt: today,
  },
  {
    id: '3',
    deck_id: '1',
    isPrivate: false,
    name: 'Experience',
    type: SpaceType.TEXT,
    canDelete: true,
    createdAt: today,
  },
  {
    id: '4',
    deck_id: '1',
    isPrivate: false,
    name: 'The Voice',
    type: SpaceType.VOIP,
    canDelete: true,
    createdAt: today,
  },
  {
    id: '5',
    deck_id: '1',
    isPrivate: false,
    name: 'Holodeck 18',
    type: SpaceType.H010,
    h010space_id: '1',
    canDelete: true,
    createdAt: today,
  },
  {
    id: '6',
    deck_id: '2',
    isPrivate: false,
    name: 'init',
    type: SpaceType.TEXT,
    canDelete: false,
    createdAt: today,
  },
  {
    id: '7',
    deck_id: '3',
    isPrivate: false,
    name: 'init',
    type: SpaceType.TEXT,
    canDelete: false,
    createdAt: today,
  },
  {
    id: '8',
    name: "shecodez's team-xi9dj7",
    user_id: '1',
    isPrivate: true,
    type: SpaceType.TEXT,
    canDelete: true,
    createdAt: today,
  },
  {
    id: '9',
    name: 'team-gu9skf',
    user_id: '1',
    isPrivate: true,
    type: SpaceType.H010,
    canDelete: true,
    createdAt: today,
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
    isOnline: true,
    status: OnlineStatus.SHOW,
    createdAt: subMonths(today, 1),
  },
  {
    id: '1',
    name: 'shecodez',
    pin: 1337,
    isOnline: true,
    status: OnlineStatus.SHOW,
    imageURL: 'https://heipqgxfpjhqerywembc.supabase.in/storage/v1/object/public/avatars/shecodez-njn.jpg',
    createdAt: subDays(today, 11),
  },
  {
    id: '010',
    name: 'VViFi',
    pin: '010',
    isOnline: true,
    status: OnlineStatus.SHOW,
    createdAt: subDays(today, 11),
  },
  {
    id: '2',
    name: '龍ハヤブサ',
    pin: 6323,
    isOnline: true,
    status: OnlineStatus.BUSY,
    createdAt: subMonths(today, 8),
  },
  {
    id: '3',
    name: 'Kai',
    pin: 3469,
    isOnline: true,
    status: OnlineStatus.HIDE,
    createdAt: subDays(today, 24),
  },
  {
    id: '4',
    name: 'WillIAm',
    pin: 2052,
    isOnline: true,
    status: OnlineStatus.AWAY,
    imageURL: 'https://randomuser.me/api/portraits/men/45.jpg',
    createdAt: subDays(today, 5),
  },
  {
    id: '5',
    name: '山田太郎',
    pin: 4284,
    isOnline: false,
    status: OnlineStatus.SHOW,
    createdAt: subDays(today, 14),
  },
  {
    id: '6',
    name: '홍길동',
    pin: 9282,
    isOnline: true,
    status: OnlineStatus.SHOW,
    createdAt: subMonths(today, 3),
  },
  {
    id: '7',
    name: 'IronMan',
    pin: 5353,
    isOnline: false,
    status: OnlineStatus.SHOW,
    createdAt: subDays(today, 9),
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
    user_id: '0',
    author: {
      name: 'Guest',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 11),
    content: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
    type: MessageType.TEXT,
  },
  {
    id: '1',
    user_id: '1',
    author: {
      name: 'Niico',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 10),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
    type: MessageType.TEXT,
  },
  {
    id: '2',
    user_id: '2',
    author: {
      name: '龍ハヤブサ',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 10),
    content: 'Do you have Paris recommendations? Have you ever been?',
    type: MessageType.TEXT,
  },
  {
    id: '22',
    user_id: '2',
    author: {
      name: '龍ハヤブサ',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 9),
    content: "Nvm, I'll just wing it. :)",
    type: MessageType.TEXT,
  },
  {
    id: '3',
    user_id: '3',
    author: {
      name: 'Kai',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 8),
    updatedAt: subDays(today, 7),
    content: 'Have any ideas about what we should get Heidi for her birthday?',
    type: MessageType.TEXT,
  },
  {
    id: '4',
    user_id: '5',
    author: {
      name: '홍길동',
    },
    space_id: '1',
    createdAt: subDays(today, 7),
    content:
      '`@Kai` We should eat this: Grate, Squash, Corn, and tomatillo Tacos. Also ~~The world is flat.~~ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
    type: MessageType.Markdown,
  },
  {
    id: '5',
    user_id: '4',
    author: {
      name: 'WillIAm',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 6),
    updatedAt: subDays(today, 5),
    content: '`@홍길동`~~Hell~~ No',
    type: MessageType.Markdown,
  },
  {
    id: '6',
    user_id: '1',
    author: {
      name: 'Niico',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 4),
    content: 'This is great.',
    type: MessageType.TEXT,
  },
  {
    id: '7',
    user_id: '1',
    author: {
      name: 'Niico',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 4),
    content:
      'Just Fantastic! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
    type: MessageType.TEXT,
  },
  {
    id: '8',
    user_id: '3',
    author: {
      name: 'Kai',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 3),
    content: "<span class='text--primary'>@홍길동 </span> We should eat MEAT!!!!11 :d",
    type: MessageType.TEXT,
  },
  {
    id: '9',
    user_id: '3',
    author: {
      name: 'Kai',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 1),
    content: 'I got some Kobe beef!!!',
    type: MessageType.TEXT,
  },
  {
    id: '10',
    user_id: '4',
    author: {
      name: 'WillIAm',
      //imageURL: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    },
    space_id: '1',
    createdAt: subDays(today, 0),
    content: '`Thatz whatz up!',
    type: MessageType.TEXT,
  },
];

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
