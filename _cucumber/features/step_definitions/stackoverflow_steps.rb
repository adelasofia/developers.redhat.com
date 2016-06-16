Given(/^I am on the Stack Overflow page$/) do
  @page.site_nav.visit('/help/stack-overflow')
  @page.site_nav.wait_for_ajax
end

Then(/^I should see a list of (\d+) results$/) do |results|
  @results = results.to_i
  @page.stack_overflow.questions_loaded?(@results)
end

Then(/^each results should contain an activity summary:$/) do |table|
  table.raw.each do |row|
    type = row.first
    @page.stack_overflow.activity_summary(type).each { |el| expect(el.text).to eq type }
  end
end

Then(/^each question should contain a question summary$/) do
  expect(@page.stack_overflow.question_summary.size).to eq @results
end

Then(/^each question should link to the relevant question on Stack Overflow$/) do
  @page.stack_overflow.question_titles.each { |link| expect(link.attribute('href')).to include 'http://stackoverflow.com/questions/' }
end

When(/^a question contains an answer$/) do
  @page.stack_overflow.question_with_answer
end

When(/^a question does not contain an answer$/) do
  @page.stack_overflow.question_without_answer
end

When(/^I (should|should not) see a "([^"]*)" section$/) do |negate, arg|
  if negate == 'should'
    expect(@page.stack_overflow.latest_answer_section_visible?).to be true
  else
    expect(@page.stack_overflow.latest_answer_section_visible?).to be false
  end
end

And(/^a "([^"]*)" link that links to that question on Stack Overflow in a new window$/) do |arg|
  @page.stack_overflow.click_read_full_question_link
  @page.stack_overflow.wait_for_windows(2)
end


Then(/^each question should display how long ago the question was asked$/) do
  expect(@page.stack_overflow.author.size).to eq @results
end

When(/^I scroll to the bottom of the page$/) do
  @page.stack_overflow.scroll_to_bottom_of_page
end