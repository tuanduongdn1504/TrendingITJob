'use strict';

// Define rule for authorization of the app
const aclRule = {
  admin: [
    {
      resource: 'bookings',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'rooms',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'packages',
      permissions: ['get', 'create', 'edit']
    }
  ],
  customer: [
    {
      resource: 'bookings',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'rooms',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'packages',
      permissions: ['get', 'create', 'edit']
    }
  ]
};

module.exports = aclRule;
