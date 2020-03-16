const userModel = {
  name: 'userModel',
  model: require('../api/user/user.model').default
};

const dealModel = {
  name: 'dealModel',
  model: require('../api/deal/deal.model').default
};

export default {
  userModel,
  dealModel,
}
