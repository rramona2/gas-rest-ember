App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,   
});

App.ApplicationView = Ember.View.extend({
  classNames: ['site-wrapper']
});

App.Router.map(function () {
  this.resource('cats', { path: '/' });
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://rest.daspot.ru', 
  namespace: 'api/AKfycbwEw9l-DeT3Qfv5CmRm60k0RALu2iVIyvyAuaWZbHp2we7xi1E'
});

App.Cat = DS.Model.extend({
  name: DS.attr('string'),
  age: DS.attr('number')
});


App.CatsRoute = Ember.Route.extend({
  model: function() {    
    return this.store.find('cat');
  }
});

App.CatController = Ember.ObjectController.extend({  
  actions: {
    edit: function() {    
      this.set('isEditing', true);
    }, 
    update: function() {
      if (Ember.isEmpty(this.get('model.name'))) {
        this.send('remove');
      } else {
        this.get('model').save();
      }      
      this.set('isEditing', false);      
    }, 
    remove: function() {      
      this.get('model').destroyRecord();
    }
  },    
  isEditing: false
});

App.CatsController = Ember.ArrayController.extend({  
  sortProperties: ['id'],   
  actions: {
    create: function() {      
      var name = this.get('name'), 
          age = this.get('age');      
      if (Ember.isEmpty(name)) {        
        return; 
      }
      var cat = this.store.createRecord('cat', {        
        name: name,
        age: age
      });      
      this.set('name', '');
      this.set('age', '');      
      cat.save();      
    }
  }
});