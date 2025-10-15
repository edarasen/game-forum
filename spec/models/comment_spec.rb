require 'rails_helper'

RSpec.describe Comment, type: :model do
  let (:test_channelgroup) {create(:channelgroup)}
  let (:test_channel) {create(:channel, channelgroup: test_channelgroup)}
  let (:test_user) {create(:user)}
  let (:test_post) {create(:post, user: test_user, channel: test_channel)}

  context "initial test" do
    it "creates comment" do
      comment = Comment.new(body: "rspec initial comment", post: test_post, user: test_user)
      expect(comment.body).to eq("rspec initial comment")
    end
  end

  context "validations" do
    it "has a body that cannot be blank" do
      comment = Comment.new(body: "", post: test_post, user: test_user)
      expect(comment).not_to be_valid
    end
  end

  context "associations" do
    it "belongs to post" do
      comment = Comment.new(body: "asdf", post: test_post, user: test_user)
      expect(comment.post).to eq(test_post)
    end
    it "belongs to user" do
      comment = Comment.new(body: "asdf", post: test_post, user: test_user)
      expect(comment.user).to eq(test_user)
    end
  end
end
