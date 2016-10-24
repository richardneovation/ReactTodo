var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () =>{

  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };

      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toBe(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should set showCompleted to true when state is false', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      var res = reducers.showCompletedReducer(df(false), df(action));
      expect(res).toBe(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: 'myid',
          text: 'Work',
          completed: false,
          createAt: 100
        }
      };

      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(action.todo);
    });

    it('should add new todos', () => {
      var intialTodos = [{
        id: 10,
        text: 'Work',
        completed: true,
        createAt: 100,
        completedAt: 125
      }];

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

      var res = reducers.todosReducer(df(intialTodos), df(action));
      expect(res.length).toBe(3);
    });

    it('should toggle todo', () => {
      var todos = [{
        id: '20',
        text: 'Walk the dog',
        completed: false,
        createAt: 100,
        completedAt: undefined
      }];
      var updates = {
        completed: false,
        completedAt: null
      };
      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };

      var res = reducers.todosReducer(df(todos), df(action));
      expect(res.length).toBe(1);
      expect(res[0].completed).toBe(updates.completed);
      expect(res[0].completedAt).toBe(updates.completedAt);
      expect(res[0].text).toEqual(todos[0].text);
    });
  });

  describe('authReducer', () => {
    it('should store uid on LOGIN', () => {
      var action = {
        type: 'LOGIN',
        uid: 'someuid'
      };

      var res = reducers.authReducer(df({}), df(action));
      expect(res).toEqual({uid:action.uid});
    });

    it('should set auth state to empty object on LOGOUT', () => {
      var action = {
        type: 'LOGOUT'
      };
      var authData = {
        uid: 'someuid'
      }
      var res = reducers.authReducer(df(authData), df(action));
      expect(res).toEqual({});
    });
  });
});
