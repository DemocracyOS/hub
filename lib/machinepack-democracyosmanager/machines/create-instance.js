var request = require('superagent');
var url = require('url');

module.exports = {
  friendlyName: 'Create Instance',
  description: 'Create a DemocracyOS instance for a given user.',
  extendedDescription: '',

  inputs: {
    url: {
      description: 'Url of Manager API.',
      example: 'http://manager.democracyos.com',
      required: true
    },
    access_token: {
      description: 'Access Token for the given Manager API.',
      example: 'a6f743e10d6ba3001c70d0c190c71cf668093370',
      required: true
    },
    instance: {
      description: 'Instance data. Needs `name`, `title`, `owner`, `summary` (optional), `imageUrl` (optional)',
      example: {
        name: 'mars-democracy',
        title: 'Mars Democracy',
        owner: '54eb6ab10eabd7d1254b1d88',
        summary: 'A long description about the implementation of democracy on Mars.'
      },
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred locally.'
    },

    serverError: {
      description: 'Unexpected error occurred.',
    },

    badRequest: {
      description: 'When there\'s something wrong with the request.',
    },

    success: {
      description: 'Instance succesfully created.',
      example: {
        instance: {
          _id: '54f85ac65ebf6b6e180cf287',
          url: 'mars-democracy.democracyos.com',
          deis_uuid: 'bc612942-4f4e-4c2a-900b-7e6340bd91a9',
          mongo_url: 'mongodb://mars-democracy:passwordondatabase@dosmongodb.cloudapp.net:27017,dosmongodb.cloudapp.net:27018/mars-democracy',
          name: 'mars-democracy',
          title: 'Mars Democracy',
          summary: 'A long description about the implementation of democracy on Mars.',
          owner: {
            _id: '54eb6ab10eabd7d1254b1d88',
            email: 'owner.email@democracyos.com'
          },
          createdAt: '2015-03-05T13:31:50.716Z'
        }
      }
    },
  },

  fn: function (inputs, exits) {
    request
      .post(url.resolve(inputs.url, '/instances'))
      .send({
        access_token: inputs.access_token,
        instance: inputs.instance
      })
      .type('application/json')
      .accept('application/json')
      .end(function(res){
        if (res.ok) return exits.success(res.body, res);
        if (res.body.code) {
          if (res.badRequest) return exits.badRequest(res.body);
          if (res.serverError) return exits.serverError(res.body);
        }
        return exits.error(res);
      });
  },
};
