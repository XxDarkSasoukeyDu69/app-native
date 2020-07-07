const notifications = [
  {
    id: '6',
    firstname: 'Romain',
    lastname: 'Boudot',
    description: 'A noté votre voyage',
    image: require('../assets/images/user.jpg'),
  },
  {
    id: '5',
    firstname: 'Elian',
    lastname: 'Bourdu',
    description: 'A noté votre voyage',
    image: require('../assets/images/user.jpg'),
  },
  {
    id: '4',
    firstname: 'Antoine',
    lastname: 'Burgaudeau',
    description: 'A aimé votre voyage',
    image: require('../assets/images/user.jpg'),
  },
  {
    id: '3',
    firstname: 'Isabelle',
    lastname: 'Cailler',
    description: 'A aimé votre voyage',
    image: require('../assets/images/user.jpg'),
  },
  {
    id: '2',
    firstname: 'Guillaume',
    lastname: 'Cailler',
    description: 'A noté votre voyage',
    image: require('../assets/images/user.jpg'),
  },
  {
    id: '1',
    firstname: 'Caimille',
    lastname: 'Bourget',
    description: 'A aimé votre voyage',
    image: require('../assets/images/user.jpg'),
  },
];

const menuProfils = [
  {
    id: '1',
    title: "Demande d'amie",
    screen: 'ProfileRequestFriendScreen',
    image: require('../assets/images/icons/friend.png'),
  },
  {
    id: '2',
    title: 'Voyages',
    screen: 'ProfileTravelScreen',
    image: require('../assets/images/icons/travel.png'),
  },
  {
    id: '3',
    title: 'Mes amis',
    screen: 'ProfileFriendScreen',
    image: require('../assets/images/icons/friendship.png'),
  },
  {
    id: '4',
    title: 'Paramètres',
    screen: 'ProfileSettingScreen',
    params: {user: []},
    image: require('../assets/images/icons/gear2.png'),
  },
];

const menuOtherProfiles = [
  {
    id: '1',
    title: 'Voyages',
    screen: 'ProfileTravelScreen',
    image: require('../assets/images/icons/travel.png'),
  },
  {
    id: '2',
    title: 'Monde',
    screen: 'WorldScreen',
    image: require('../assets/images/icons/globe.png'),
  },
  {
    id: '3',
    title: 'Signalé',
    screen: 'ProfileTravelScreen',
    image: require('../assets/images/icons/alert.png'),
  }
]

const users = [
  {
    id: 'a',
    lastname: 'Baptiste',
    firstname: 'Magoni',
    isFriend: false,
  },
];

const friends = [
  {
    id: 'a',
    lastname: 'Cailler',
    firstname: 'alexandre',
    isFriend: true,
  },
  {
    id: 'x',
    lastname: 'Antoine',
    firstname: 'Burgaudeau',
    isFriend: true,
  },
  {
    id: 'd',
    lastname: 'Cailler',
    firstname: 'alexandre',
    isFriend: true,
  },
  {
    id: 'b',
    lastname: 'Camille',
    firstname: 'Chen',
    isFriend: true,
  },
  {
    id: 's',
    lastname: 'Axel',
    firstname: 'Blusseau',
    isFriend: true,
  },
];

const travels = [
  {
    id: '1',
    dateEnd: '12/12/2019',
    dateStart: '12/12/2019',
    title: 'ceci est un titre inutile',
    image: require('../assets/images/voyage.jpeg'),
    description:
      "Ceci est une description de mon voyage trop cool, vraiment , une description d'enfer, mieux que le lorem ipsum cette merde ",
  },
];

export {notifications, menuProfils, friends, users, travels, menuOtherProfiles};
