/**
  * - CommentBox
  *   - CommentList
  *     - Comment
  *   - CommentForm
**/

var comments = [
  { id: 1, author: "Tony", text: "React is cool."},
  { id: 2, author: "Jesse", text: "Redux is in flux."},
  { id: 3, author: "Kevin", text: "Angular is so last month."}
];

var moreComments = [
  { id: 4, author: "Theo", text: "I like music."},
  { id: 5, author: "Chaz", text: "I like food."},
  { id: 6, author: "Fred", text: "I like hot chocolate."}
];

var CommentBox = React.createClass({
  getInitialState: function () {
    return {
      data: []
    };
  },

  loadCommentsFromServer: function (comment) {
    $.ajax({
      method: 'GET',
      url: this.props.url,
      dataType: 'json',
      data: comment,
      success: function(data) {
        this.setState({ data: data });
      }.bind(this)
    });
  },

  handleCommentSubmit: function (comment) {
    $.ajax({
      method: 'POST',
      url: this.props.url,
      dataType: 'json',
      data: comment,
      success: function(data) {
        this.setState({ data: this.state.data.concat(data) });
      }.bind(this) // 'this' = CommentBox
    });
  },

  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, 5000);
  },

  render: function () {
    return (
      <div className="commentBox">
        <CommentList
          data={this.state.data}
        />
        <CommentForm
          onCommentSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment, index) {
      return (
        <Comment key={index} author={comment.author}>{comment.text}</Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes.reverse()}
      </div>
    )
  }
})

var Comment = React.createClass({
  rawMarkup: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
});

var CommentForm = React.createClass({
  getInitialState: function () {
    return {author: '', text: ''};
  },

  handleAuthorChange: function (e) {
    this.setState({ author: e.target.value });
  },

  handleTextChange: function (e) {
    this.setState({ text: e.target.value });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var author = this.state.author;
    var text =  this.state.text;
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({ author: '', text: '' });
  },

  render: function () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="your name..."
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="speak..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="POST" />
      </form>
    )
  }
})

ReactDOM.render(
  <CommentBox url="http://localhost:3000/comments" />,
  document.getElementById('content')
);