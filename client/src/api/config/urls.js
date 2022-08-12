export const BASE_URL = 'http://0.0.0.0:8080/rest';

export const urls = {
  report: {
    nearby: '/reports/nearby',
    saveReport: '/reports',
    addReaction: '/reports/react',
  },
  auth: {
    login: '/auth/login',
    register: '/users',
    getUser: '/auth/user',
  },
  profile: {
    getInfo: '/profile/info',
  },
  category: {
    all: '/categories/all',
  },
  feed: {
    nearby: '/feed/nearby',
  },
  comment: {
    add: '/comment',
    getByFeed: '/comment/byfeed',
    delete: '/comment',
  },
  feedReaction: {
    add: '/feed/react',
  },

  event: {
    nearby: '/event/nearby',
    participate: '/event/participate',
  },
  user: {
    profile: '/users/profile',
    saveProfile: '/users/update',
  },
};
