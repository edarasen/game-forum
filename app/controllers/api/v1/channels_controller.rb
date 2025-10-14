class Api::V1::ChannelsController < ApplicationController
  before_action :set_channel, only: %i[ show update destroy ]

  # GET /channels
  def index
    @channelgroup = Channelgroup.find(params.expect(:channelgroup_id))
    @channels = @channelgroup.channels

    render json: @channels
  end

  # GET /channels/1
  def show
    render json: @channel
  end

  # POST /channels
  def create
    @channelgroup = Channelgroup.find(params.expect(:channelgroup_id))
    @channel = @channelgroup.channels.build(channel_params)

    if @channel.save
      render json: @channel, status: :created
    else
      render json: @channel.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /channels/1
  def update
    if @channel.update(channel_params)
      render json: @channel
    else
      render json: @channel.errors, status: :unprocessable_content
    end
  end

  # DELETE /channels/1
  def destroy
    @channel.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_channel
      @channel = Channel.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def channel_params
      params.expect(channel: [:title, :description])
    end
end
