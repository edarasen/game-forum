require 'rails_helper'

RSpec.describe Report, type: :model do
  let (:test_channelgroup) { create(:channelgroup) }
  let (:test_channel) { create(:channel, channelgroup: test_channelgroup) }
  let (:test_user) { create(:user) }
  let (:test_post) { create(:post, user: test_user, channel: test_channel) }
  let (:test_comment) { create(:comment, user: test_user, post: test_post) }

  context "initial test" do
    it "creates post report" do
      channelgroup = test_channelgroup
      channel = test_channel
      user  = test_user
      post = test_post
      report = Report.create(content_type: 'post', content_id: post.id, user_id: user.id)
      expect(Report.posts.count).to eq(1)
    end
    it "creates comment report" do
      channelgroup = test_channelgroup
      channel = test_channel
      user  = test_user
      post = test_post
      comment = test_comment
      report = Report.create(content_type: 'comment', content_id: comment.id, user_id: user.id)
      expect(Report.comments.count).to eq(1)
    end
  end

  context "validations" do
    it "has a content_id that cannot be blank" do
      report = Report.new
      expect(report).not_to be_valid
    end
  end
end
