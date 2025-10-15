require 'rails_helper'

RSpec.describe Channel, type: :model do
  let (:test_channelgroup) {create(:channelgroup)}

  context "initial test" do
    it "creates channel" do
      channel = Channel.new(title: "rspec initial channel", description: "channel description", channelgroup: test_channelgroup)
      expect(channel.title).to eq("rspec initial channel")
    end
  end

  context "validations" do
    it "has a title that cannot be blank" do
      channel = Channel.new(title: "", description: "asdf")
      expect(channel).not_to be_valid
    end
    it "has a description that cannot be blank" do
      channel = Channel.new(title: "asdf", description:"")
      expect(channel).not_to be_valid
    end
  end

  context "associations" do
    it "belongs to channel group" do
      channelgroup = test_channelgroup
      channel = Channel.new(title: "rspec initial channel", description: "channel description", channelgroup: channelgroup)
      expect(channel.channelgroup).to eq(test_channelgroup)
    end
  end
end
