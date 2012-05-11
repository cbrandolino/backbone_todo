(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Item = (function(_super) {

    __extends(Item, _super);

    function Item() {
      this.set_done = __bind(this.set_done, this);
      this.clear = __bind(this.clear, this);
      Item.__super__.constructor.apply(this, arguments);
    }

    Item.prototype.defaults = {
      status: 1,
      priority: 2
    };

    Item.prototype.clear = function() {
      return this.destroy();
    };

    Item.prototype.set_done = function() {
      return this.save({
        status: 0
      });
    };

    return Item;

  })(Backbone.Model);

  window.ItemCollection = (function(_super) {

    __extends(ItemCollection, _super);

    function ItemCollection() {
      ItemCollection.__super__.constructor.apply(this, arguments);
    }

    ItemCollection.prototype.model = Item;

    ItemCollection.prototype.localStorage = new Store("todos");

    ItemCollection.prototype.comparator = function(item) {
      if (item.attributes.status === 1) {
        return -item.attributes.priority;
      } else {
        return 1;
      }
    };

    return ItemCollection;

  })(Backbone.Collection);

  window.list = new ItemCollection;

}).call(this);
