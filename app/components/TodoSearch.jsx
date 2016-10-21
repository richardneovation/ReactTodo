var React = require('react');

var TodoSearch = React.createClass({
  handleSearch: function() {
    var searchText = this.refs.searchText.value;
    var showCompleted = this.refs.showCompleted.checked;

    this.props.onSearch(searchText, showCompleted);
  },
  render: function() {
    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" placeholder="Search todos" onChange={this.handleSearch}/>
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/>
            Show completed todos
          </label>
        </div>
      </div>
    );
  }
});

module.exports = TodoSearch;
