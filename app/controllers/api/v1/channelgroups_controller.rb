class Api::V1::ChannelgroupsController < ApplicationController
  before_action :set_channelgroup, only: %i[ show update destroy ]
  before_action :ensure_admin_moderator, only: %i[ create update destroy ]

  # GET api/v1/channelgroups
  # Returns : @channelgroups data is converted too json using template in 'views/api/v1/channelgroups/index.json.props'
  def index
    @channelgroups = Channelgroup.all
  end

  # GET api/v1/channelgroups/:id
  # Uses before_action set_channelgroup to specify a channelgroup
  # Returns : @channelgroup data is converted to json using template in 'views/api/v1/channelgroups/show.json.props'
  def show
    # render json: @channelgroup -> show.json.props
  end

  # POST api/v1/channelgroups
  # Uses before_action ensure_admin_moderator before the action proceeds
  # Returns : @channelgroup data is converted to json using template in 'views/api/v1/channelgroups/create.json.props'
  # OR an error message if object fails to save due to invalid parameters
  def create
    @channelgroup = Channelgroup.new(channelgroup_params)

    if !@channelgroup.save
      render json: @channelgroup.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT api/v1/channelgroups/:id
  # Uses before_action ensure_admin_moderator before the action proceeds
  # Uses before_action set_channelgroup to specify a channelgroup
  # Returns : @channelgroup data is converted to json using template in 'views/api/v1/channelgroups/update.json.props'
  # OR an error message if object fails to save due to invalid parameters
  def update
    if !@channelgroup.update(channelgroup_params)
      render json: @channelgroup.errors, status: :unprocessable_content
    end
  end

  # DELETE api/v1/channelgroups/:id
  # Uses before_action ensure_admin_moderator before the action proceeds
  # Uses before_action set_channelgroup to specify a channelgroup
  # Returns : json message: "Destroy successful" after destroy action is executed
  def destroy
    # could add destroy permissions in the future
    @channelgroup.destroy!
    render json: { message: "Destroy successful" }, status: :accepted
  end

  private

  # Authenticates user and checks role of user
  # Returns : json message: current_user is not an administrator or moderator
  # OR proceeds to next action 
  def ensure_admin_moderator
    authenticate_user!
    if (!current_user.admin? && !current_user.moderator?) || current_user.deactivated === true
      render json: { message: "#{current_user.username} is not an active administrator or moderator" }, status: :forbidden and return
    end
  end

  # Assigns a @channelgroup object before proceeding to next action
  # @param id [Integer] the channelgroup id specified in params
  def set_channelgroup
    @channelgroup = Channelgroup.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through
  # @param title [String] the channelgroup's title
  # @param description [String] the channelgroup's description
  def channelgroup_params
    params.expect(channelgroup: [ :title, :description ])
  end
end
