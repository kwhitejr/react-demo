/**
  * - CommentBox
  *   - CommentList
  *     - Comment
  *   - CommentForm
**/

var CommentBox = React.createClass({
  render: function () {
    return (
      <div className="commentBox">
        Hello world! I am a CommentBox.
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    return (
      <div className="commentList">
        <Comment author="Kevin">React is my jam.</Comment>
        <Comment author="Jon">React is _**my**_ jam.</Comment>
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
  render: function () {
    return (
      <div className="commentForm">
        This isn't even my final FORM.
      </div>
    )
  }
})

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);