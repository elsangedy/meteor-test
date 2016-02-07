Mensagem = new Meteor.Collection('mensagem');

if (Meteor.isClient) {
  Meteor.subscribe('mensagem');

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Mensagem.remove({});
    console.log("Rodando MicroTwitter");
  });

  Meteor.publish('mensagem', function() {
    return Mensagem.find({
      $or: [
        {private: {$ne: true}},
        {owner: this.userId}
      ]
    });
  });
}

Meteor.methods({
  addMensagem: function(nome, conteudo) {
    Mensagem.insert({
      nome: nome,
      conteudo: conteudo,
      data: new Date().toLocaleString(),
      owner: Meteor.userId()
    });
  },
  updMensagem: function(id, data) {
    data = data || {};

    var msg = Mensagem.findOne(id);

    if(msg.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Mensagem.update(id, {$set: data});
  },
  delMensagem: function(id) {
    var msg = Mensagem.findOne(id);

    if(msg.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Mensagem.remove(id);
  },
  setPrivateMensagem: function(id, private) {
    var msg = Mensagem.findOne(id);

    if(msg.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Mensagem.update(id, {$set: {private: private}});
  }
});