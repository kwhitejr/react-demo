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

  render: function () {
    return (
      <div className="commentBox">
        Hello world! I am a CommentBox.
        <CommentList data={this.state.data} />
        <CommentForm />
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
        {commentNodes}
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
  <CommentBox data={moreComments} />,
  document.getElementById('content')
);