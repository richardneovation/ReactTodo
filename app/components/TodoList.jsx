var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired
  },
  render: function() {
    var {todos} = this.props;
    var renderTodos = () => {
      if (todos.length === 0) {
          return (
            <p className="container__message">Nothing To Do</p>
          );
      }

      return todos.map((todo) => {
        return (
          <Todo onToggle={this.props.onToggle} key={todo.id} {...todo} />
        );
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    );
  }
});

module.exports = TodoList;
