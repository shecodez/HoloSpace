import { setDate, subDays, subMonths } from 'date-fns';

const today = new Date();

function thisMonth(d: number, h: number, m: number) {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
}

export enum DiskspaceType {
  TEXT = 'TEXT',
  VOIP = 'VOIP',
  H010 = 'H010',
}

export enum CommType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  H010 = 'H010',
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
  VERY_WEAK = 'VERY_WEAK',
  WEAK = 'WEAK',
  MEDIUM = 'MEDIUM',
  STRONG = 'STRONG',
  VERY_STRONG = 'VERY_STRONG',
  OVER_9000 = 'OVER_9000',
}

export enum Region {
  US_EAST = 'US-East',
  JP_ASIA = 'JP-Asia',
}

export const decks = [
  {
    id: '1',
    name: 'Resume | NJN',
    boot_disk_id: '1',
    captain_id: '1',
    hq: Region.US_EAST,
    created_at: today,
  },
  { id: '2', name: '이거 매워요?', boot_disk_id: '6', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  { id: '3', name: '見ぬが花', boot_disk_id: '7', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '4', name: 'Deck 4', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '5', name: 'Deck 5', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '6', name: 'Deck 6', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '7', name: 'Deck 7', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '8', name: 'Deck 8', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '9', name: 'Deck 9', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '14', name: 'Deck 14', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '15', name: 'Deck 15', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '16', name: 'Deck 16', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '17', name: 'Deck 17', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '18', name: 'Deck 18', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
  // { id: '19', name: 'Deck 19', boot_disk_id: '1', captain_id: '1', hq: Region.JP_ASIA, created_at: today },
];

export const diskspaces = [
  {
    id: '1',
    deck_id: '1',
    is_ssh: false,
    name: 'Init Space',
    topic: 'rawr',
    type: DiskspaceType.TEXT,
    can_delete: false,
    created_at: today,
  },
  {
    id: '2',
    deck_id: '1',
    is_ssh: false,
    name: 'Education',
    type: DiskspaceType.TEXT,
    can_delete: false,
    created_at: today,
  },
  {
    id: '3',
    deck_id: '1',
    is_ssh: false,
    name: 'Experience',
    type: DiskspaceType.TEXT,
    can_delete: true,
    created_at: today,
  },
  {
    id: '4',
    deck_id: '1',
    is_ssh: false,
    name: 'The Voice',
    type: DiskspaceType.VOIP,
    can_delete: true,
    created_at: today,
  },
  {
    id: '5',
    deck_id: '1',
    is_ssh: false,
    name: 'Holodeck 18',
    type: DiskspaceType.H010,
    h010space_id: '1',
    can_delete: true,
    created_at: today,
  },
  {
    id: '6',
    deck_id: '2',
    is_ssh: false,
    name: 'init',
    type: DiskspaceType.TEXT,
    can_delete: false,
    created_at: today,
  },
  {
    id: '7',
    deck_id: '3',
    is_ssh: false,
    name: 'init',
    type: DiskspaceType.TEXT,
    can_delete: false,
    created_at: today,
  },
  {
    id: '8',
    name: "shecodez's team-xi9dj7",
    user_id: '1',
    is_ssh: true,
    type: DiskspaceType.TEXT,
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
    image_url: 'https://i.pravatar.cc/500?img=16',
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
    diskspace_id: '4',
    users: [users[5]],
  },
  {
    diskspace_id: '5',
    users: [users[4], users[7]],
  },
];

export const messages = [
  {
    id: '0',
    user_id: '0',
    author: {
      name: 'Guest',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 11),
    text: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
  },
  {
    id: '1',
    user_id: '1',
    author: {
      name: 'Niico',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 10),
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
  },
  {
    id: '2',
    user_id: '2',
    author: {
      name: '龍ハヤブサ',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 10),
    text: 'Do you have Paris recommendations? Have you ever been?',
  },
  {
    id: '22',
    user_id: '2',
    author: {
      name: '龍ハヤブサ',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 9),
    text: "Nvm, I'll just wing it. :)",
  },
  {
    id: '3',
    user_id: '3',
    author: {
      name: 'Kai',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 8),
    updated_at: subDays(today, 7),
    text: 'Have any ideas about what we should get Heidi for her birthday?',
  },
  {
    id: '4',
    user_id: '5',
    author: {
      name: '홍길동',
    },
    diskspace_id: '1',
    created_at: subDays(today, 7),
    text: '`@Kai` We should eat this: Grate, Squash, Corn, and tomatillo Tacos. Also ~~The world is flat.~~ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
    is_markdown: true,
  },
  {
    id: '5',
    user_id: '4',
    author: {
      name: 'WillIAm',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 6),
    updated_at: subDays(today, 5),
    text: '`@홍길동`~~Hell~~ No',
    is_markdown: true,
  },
  {
    id: '6',
    user_id: '1',
    author: {
      name: 'Niico',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 4),
    text: 'This is great.',
  },
  {
    id: '7',
    user_id: '1',
    author: {
      name: 'Niico',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 4),
    text: 'Just Fantastic! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id cursus leo. Aenean condimentum dolor leo, id aliquet lorem consectetur in. Ut nec mattis odio. Suspendisse feugiat ex ac massa interdum posuere.',
  },
  {
    id: '8',
    user_id: '3',
    author: {
      name: 'Kai',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 3),
    text: "<span class='text--primary'>@홍길동 </span> We should eat MEAT!!!!11 :d",
  },
  {
    id: '9',
    user_id: '3',
    author: {
      name: 'Kai',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 1),
    text: 'I got some Kobe beef!!!',
  },
  {
    id: '10',
    user_id: '4',
    author: {
      name: 'WillIAm',
      //image_url: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    },
    diskspace_id: '1',
    created_at: subDays(today, 0),
    text: '`Thatz whatz up!',
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
