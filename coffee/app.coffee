$ ->
  class ItemView extends Backbone.View 
    tagName:  "li",
    template: _.template($('#item_template').html())

    events:
      'click .delete': 'clear'
      'click .done': 'done'

    initialize: ->
      @model.view = this
      @model.bind('destroy', @remove, this)
      @model.bind('change', @render, this)

    render: =>
      @$el.html @template(@model.toJSON())

    clear: ->
      @model.clear()
    done: ->
      @model.set_done()

  class window.AppView  extends Backbone.View 
    el: $('#container')
    
    events:
      'submit #new_item': 'newItem'

    initialize: ->
      window.list.fetch()
      @addItems()

    newItem: (data) ->
      window.list.create {
        title: $('#new_title').val(),
        priority: $('#new_priority').val()
      }

    addItem: (item) ->
      view = new ItemView({el:@el, model: item})
      $("#items").append view.render()

    addItems: ->
      window.list.each(@addItem);

  new AppView