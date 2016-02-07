if (Meteor.isClient) {
  Template.formulario.events({
    'click #enviar': function(event, template) {
      var nome = template.find('#nome').value;
      var conteudo = template.find('#conteudo').value;
      Meteor.call('addMensagem', nome, conteudo);
      event.preventDefault();
    }
  });
}