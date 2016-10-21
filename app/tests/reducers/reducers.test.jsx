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
        text: 'New todo'
      };

      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toBe(1);
      expect(res[0].text).toBe(action.text);
    });

    it('should toggle todo', () => {
      var todos = [{
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
      }];

      var completeAction = {
        type: 'TOGGLE_TODO',
        id: 20
      };
      var uncompleteAction = {
        type: 'TOGGLE_TODO',
        id: 30
      };

      var resA = reducers.todosReducer(df(todos), df(completeAction));
      expect(resA.length).toBe(2);
      expect(resA[0].completed).toBe(true);
      expect(resA[0].completedAt).toBeA('number');

      var resB = reducers.todosReducer(df(todos), df(uncompleteAction));
      expect(resB.length).toBe(2);
      expect(resB[1].completed).toBe(false);
      expect(resB[1].completedAt).toEqual(undefined);
    });
  });
});
