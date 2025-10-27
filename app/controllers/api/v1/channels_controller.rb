class Api::V1::ChannelsController < ApplicationController
  before_action :set_channel, only: %i[ show update destroy ]
  before_action :ensure_admin_moderator, only: %i[ create update destroy ]

  def all
    @channels = Channel.all
  end

  # GET api/v1/channelgroups/:channelgroup_id/channels
  # @param channelgroup_id [Integer] the channelgroup id specified in params
  # Returns : @channels data is converted to json using template in 'views/api/v1/channels/index.json.props'
  def index
    @channelgroup = Channelgroup.find(params.expect(:channelgroup_id))
    @channels = @channelgroup.channels
  end

  # GET api/v1/channels/:id
  # Uses before_action set_channel to specify a channel
  # Returns : @channel data is converted to json using template in 'views/api/v1/channels/show.json.props'
  def show
  end

  # POST api/v1/channelgroups/:channelgroup_id/channels
  # Uses before_action ensure_admin_moderator before the action proceeds
  # @param channelgroup_id [Integer] the channelgroup id specified in params
  # Returns : @channel data is converted to json using template in 'views/api/v1/channelgroups/create.json.props'
  # OR an error message if object fails to save due to invalid parameters
  def create
    @channelgroup = Channelgroup.find(params.expect(:channelgroup_id))
    @channel = @channelgroup.channels.build(channel_params)

    if !@channel.save
      render json: @channel.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT api/v1/channels/:id
  # Uses before_action set_channel to specify a channel
  # Returns : @channel data is converted to json using template in 'views/api/v1/channels/update.json.props'
  # OR an error message if object fails to save due to invalid parameters
  def update
    if !@channel.update(channel_params)
      render json: @channel.errors, status: :unprocessable_content
    end
  end

  # DELETE api/v1/channels/:id
  # Uses before_action ensure_admin_moderator before the action proceeds
  # Uses before_action set_channel to specify a channel
  # Returns : json message: "Destroy successful" after destroy action is executed
  def destroy
    @channel.destroy!
    render json: {message: 'Destroy successful'}, status: :accepted
  end

  private
  # Authenticates user and checks role of user
  # Returns : json message: current_user is not an administrator or moderator
  # OR proceeds to next action 
  def ensure_admin_moderator
    authenticate_user!
    if !current_user.admin? && !current_user.moderator?
      render json: { message: "#{current_user.username} is not an administrator or moderator" }, status: :forbidden and return
    end
  end

  # Assigns a @channel object before proceeding to next action
  # @param id [Integer] the channel id specified in params
  def set_channel
    @channel = Channel.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through
  # @param title [String] the channel's title
  # @param description [String] the channel's description
  def channel_params
    params.expect(channel: [:title, :description, :post_permission])
  end
end
