import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

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
      todo: {
        id: '123abc',
        text: 'Walk the dog',
        completed: false,
        createAt: 100
      }
    };

    var res = actions.addTodo(action.todo);
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
      type: 'UPDATE_TODO',
      id: '23',
      updates: {completed: false}
    };

    var res = actions.updateTodo(action.id, action.updates);
    expect(res).toEqual(action);
  });

  it('should generate login action', () => {
    var action = {
      type: 'LOGIN',
      uid: 'someuid'
    };

    var res = actions.login(action.uid);
    expect(res).toEqual(action);
  });

  it('should generate logout action', () => {
    var action = {
      type: 'LOGOUT'
    };

    var res = actions.logout();
    expect(res).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    var testTodoRef;
    var uid;
    var todosRef;

    beforeEach((done) => {
      firebase.auth().signInAnonymously().then((user) => {
        uid = user.uid;
        todosRef = firebaseRef.child(`users/${uid}/todos`);

        return todosRef.remove();
      }).then(() => {
        testTodoRef = todosRef.push();

        return testTodoRef.set({
          text: 'Something to do',
          completed: false,
          createdAt: 1234231
        })
        .then(() => done())
        .catch(done);;
      });
    });

    afterEach((done) => {
      testTodoRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();
        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });
        expect(mockActions[0].updates).toInclude({completed: true});
        expect(mockActions[0].updates.completedAt).toBeA('number');

        done();
      }, done);
    });

    it('should toggle todo and dispatch ADD_TODOS action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();
        expect(mockActions[0]).toInclude({
          type: 'ADD_TODOS'
        });
        expect(mockActions[0].todos.length).toBe(1);
        expect(mockActions[0].todos[0].text).toEqual('Something to do');

        done();
      }, done);
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
      const todoText = 'My todo item';

      store.dispatch(actions.startAddTodo(todoText)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].todo).toInclude({
          text: todoText
        });
        done();
      }).catch(done);
    });
  });
});
