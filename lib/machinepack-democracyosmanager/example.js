var Manager = require('./index');

Manager.createInstance({
  url: 'http://manager.democracyos.dev',
  access_token: 'a6f743e10d6ba3001c70d0c190c71cf668093370',
  instance: {
    name: 'mars-democracy4',
    title: 'Mars Democracy 4',
    owner: '54eb6ab10eabd7d1254b1d88',
    summary: 'A long description about the implementation of democracy on Mars.'
  }
}).exec({
  error: function (res){
    console.log('Unexpected error');
  },

  badRequest: function(err){
    console.log('Bad Request');
    // {
    //   code: 400,
    //   err: {
    //     //
    //   }
    // }
  },

  serverError: function(err){
    console.log('Server Error');
    // {
    //   code: 500,
    //   err: {
    //     //
    //   }
    // }
  },

  success: function(instance){
    console.log('Instance Created!', instance);
  }
});
