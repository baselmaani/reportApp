export const BASE_URL = 'http://192.168.0.59:8083/rest';

export const urls = {
  report: {
    nearby: '/staff/reports',
    byid: '/staff/report',
    handle: '/staff/report/handle',
    react: '/staff/report/reaction',
  },
  auth: {
    login: '/auth/staff/login',
    register: '/users/',
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
