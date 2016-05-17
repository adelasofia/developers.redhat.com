/*
  Featured Q&A Component
  Shows up on Product Overview pages
*/

app = window.app || {};

app.featuredQA = {};

app.featuredQA.fetch = function() {
  $.getJSON(app.dcp.url.search + '/stackoverflow/?tag=rhel' ,function(data){
    if(data.hits && data.hits.hits) {
      app.featuredQA.render(data.hits.hits);
    }
  });
}

app.featuredQA.render = function(questions) {
  questions = questions.slice(0,6);
  var html = [];
  questions.forEach(function(question){
    var type = question._source.sys_type[0];
    var timeStamp = new Date(question._source.sys_created[0]);
    // var formattedDate = moment(timeStamp).format('ll');
    var tags = question._source.sys_tags.join(', ').substr(0, 30);
    var item = [
      '<li>',
        '<a href="' + question._source.sys_url_view + '" class="title">',
          question._source.sys_title,
          '<p>',
            '<strong>Latest answer </strong>',
            'by NAME HERE: ',
            // question._source.answers.body,
            '<br>',
            '<strong>TAGS: </strong>',
            tags,
          '</p>',
        '</a>',
      '</li>'
    ].join('');
    console.log(question); 
    html.push(item);
  });

  $('.product-featured-qa').html(html.join(''));
}

$(function() {
  var $featuredQAResourceList = $('.product-featured-qa');
  // check if we are on a page that needs this to run
  if($featuredQAResourceList.length) {
    app.featuredQA.fetch();
  }
});
