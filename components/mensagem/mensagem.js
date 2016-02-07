if (Meteor.isClient) {
  Template.mensagens.events({
    'click .delete': function() {
      Meteor.call('delMensagem', this._id);
    },
    'click .toggle-private': function() {
      Meteor.call('setPrivateMensagem', this._id, !this.private);
    }
  });

  Template.mensagens.helpers({
    timeline: function() {
      return Mensagem.find();
    },
    isOwner: function() {
      return this.owner === Meteor.userId();
    }
  });
}