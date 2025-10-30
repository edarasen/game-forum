require 'rails_helper'

RSpec.describe Post, type: :model do
  let (:test_channelgroup) { create(:channelgroup) }
  let (:test_channel) { create(:channel, channelgroup: test_channelgroup) }
  let (:test_user) { create(:user) }
  let (:test_post) { create(:post, user: test_user, channel: test_channel) }

  context "initial test" do
    it "creates post" do
      post = Post.new(title: "rspec initial post", body: "post body", channel: test_channel, user: test_user)
      expect(post.title).to eq("rspec initial post")
    end
  end

  context "validations" do
    it "has a title that cannot be blank" do
      post = Post.new(title: "", body: "asdf", channel: test_channel, user: test_user)
      expect(post).not_to be_valid
    end
    it "has a body that cannot be blank" do
      post = Post.new(title: "asdf", body: "", channel: test_channel, user: test_user)
      expect(post).not_to be_valid
    end
  end

  context "associations" do
    it "belongs to user" do
      post = Post.new(title: "asdf", body: "asdf", channel: test_channel, user: test_user)
      expect(post.user).to eq(test_user)
    end
    it "belongs to channel" do
      post = Post.new(title: "asdf", body: "asdf", channel: test_channel, user: test_user)
      expect(post.channel).to eq(test_channel)
    end
    it "has many comments" do
      post = test_post
      comment_one = post.comments.create(body: "comment one", user: test_user)
      comment_two = post.comments.create(body: "comment two", user: test_user)
      expect(post.comments[0].body).to eq("comment one")
      expect(post.comments[1].body).to eq("comment two")
      expect(post.comments.count).to eq(2)
    end
  end
end
