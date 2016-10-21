var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };

    var res = actions.setSearchText(action.searchText);
    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'Homework'
    };

    var res = actions.addTodo(action.text);
    expect(res).toEqual(action);
  });

  it('should generate add todos action', () => {
    var action = {
      type: 'ADD_TODOS',
      todos: [{
        id: 20,
        text: 'Walk the dog',
        completed: false,
        createAt: 100,
        completedAt: undefined
      },{
        id: 30,
        text: 'Sleep',
        completed: true,
        createAt: 200,
        completedAt: 225
      }]
    };

    var res = actions.addTodos(action.todos);
    expect(res).toEqual(action);
  });

  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 23
    };

    var res = actions.toggleTodo(action.id);
    expect(res).toEqual(action);
  });
});
