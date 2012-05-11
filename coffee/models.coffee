class window.Item extends Backbone.Model
  defaults:
    status: 1,
    priority: 2
  clear: =>
    @destroy()
  set_done: =>
    @save({status: 0})

class window.ItemCollection extends Backbone.Collection
  model: Item
  localStorage: new Store("todos")
  comparator: (item) ->
    if item.attributes.status == 1
      - item.attributes.priority
    else 
      1

window.list = new ItemCollection