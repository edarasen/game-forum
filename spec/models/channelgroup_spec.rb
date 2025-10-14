require 'rails_helper'

RSpec.describe Channelgroup, type: :model do
  let (:test_channelgroup) { create(:channelgroup) }

  context "initial test" do
    it "creates channel group" do
      channelgroup = Channelgroup.new(title: "rspec initial channel group", description: "channel group description")
      expect(channelgroup.title).to eq("rspec initial channel group")
    end
  end

  context "validations" do
    it "has a title that cannot be blank" do
      channelgroup = Channelgroup.new(title: "", description: "asdf")
      expect(channelgroup).not_to be_valid
    end
    it "has a description that cannot be blank" do
      channelgroup = Channelgroup.new(title: "asdf", description:"")
      expect(channelgroup).not_to be_valid
    end
  end

  context "associations" do
    it "has many channels" do
      channelgroup = test_channelgroup
      channel_one = test_channelgroup.channels.create(title:"channel one", description:"channel one description")
      channel_two = test_channelgroup.channels.create(title:"channel two", description:"channel two description")
      expect(channelgroup.channels[0].title).to eq("channel one")
      expect(channelgroup.channels[1].title).to eq("channel two")
      expect(channelgroup.channels.count).to eq(2)
    end
  end
end
