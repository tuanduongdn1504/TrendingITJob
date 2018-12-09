'use strict';

// Define rule for authorization of the app
const aclRule = {
  admin: [
    {
      resource: 'bookings',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'projects',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'posts',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'tags',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'productOwners',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'companies',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'workers',
      permissions: ['get', 'create', 'edit']
    }
  ],
  productOwner: [
    {
      resource: 'bookings',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'projects',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'posts',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'tags',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'productOwners',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'companies',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'workers',
      permissions: ['get', 'create', 'edit']
    }
  ],
  company: [
    {
      resource: 'bookings',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'projects',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'posts',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'tags',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'productOwners',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'companies',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'workers',
      permissions: ['get', 'create', 'edit']
    }
  ],
  worker: [
    {
      resource: 'bookings',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'projects',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'posts',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'tags',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'productOwners',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'companies',
      permissions: ['get', 'create', 'edit']
    },
    {
      resource: 'workers',
      permissions: ['get', 'create', 'edit']
    }
  ]
};

module.exports = aclRule;
