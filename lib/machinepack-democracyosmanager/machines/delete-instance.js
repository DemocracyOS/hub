var request = require('superagent');
var url = require('url');

module.exports = {
  friendlyName: 'Delete Instance.',
  description: 'Delete a DemocracyOS Instance.',
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
    name: {
      description: 'Name of the instnace to Delete.',
      example: 'mars-democracy',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred locally.',
    },

    serverError: {
      description: 'Unexpected error occurred.'
    },

    badRequest: {
      description: 'When there\'s something wrong with the request.',
    },

    success: {
      description: 'Instance succesfully deleted.'
    },
  },

  fn: function (inputs, exits) {
    request
      .del(url.resolve(inputs.url, '/instances', '/'+inputs.name))
      .send({
        access_token: inputs.access_token
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
