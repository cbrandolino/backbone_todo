(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $(function() {
    var ItemView;
    ItemView = (function(_super) {

      __extends(ItemView, _super);

      function ItemView() {
        this.render = __bind(this.render, this);
        ItemView.__super__.constructor.apply(this, arguments);
      }

      ItemView.prototype.tagName = "li";

      ItemView.prototype.template = _.template($('#item_template').html());

      ItemView.prototype.events = {
        'click .delete': 'clear',
        'click .done': 'done'
      };

      ItemView.prototype.initialize = function() {
        this.model.view = this;
        this.model.bind('destroy', this.remove, this);
        return this.model.bind('change', this.render, this);
      };

      ItemView.prototype.render = function() {
        return this.$el.html(this.template(this.model.toJSON()));
      };

      ItemView.prototype.clear = function() {
        return this.model.clear();
      };

      ItemView.prototype.done = function() {
        return this.model.set_done();
      };

      return ItemView;

    })(Backbone.View);
    window.AppView = (function(_super) {

      __extends(AppView, _super);

      function AppView() {
        AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.el = $('#container');

      AppView.prototype.events = {
        'submit #new_item': 'newItem'
      };

      AppView.prototype.initialize = function() {
        window.list.fetch();
        return this.addItems();
      };

      AppView.prototype.newItem = function(data) {
        return window.list.create({
          title: $('#new_title').val(),
          priority: $('#new_priority').val()
        });
      };

      AppView.prototype.addItem = function(item) {
        var view;
        view = new ItemView({
          el: this.el,
          model: item
        });
        return $("#items").append(view.render());
      };

      AppView.prototype.addItems = function() {
        return window.list.each(this.addItem);
      };

      return AppView;

    })(Backbone.View);
    return new AppView;
  });

}).call(this);
