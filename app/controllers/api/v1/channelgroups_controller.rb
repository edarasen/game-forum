class Api::V1::ChannelgroupsController < ApplicationController
  before_action :set_channelgroup, only: %i[ show update destroy ]
  before_action :ensure_admin_moderator, only: %i[ create update destroy ]

  # GET /channelgroups
  def index
    @channelgroups = Channelgroup.all

    render json: @channelgroups
  end

  # GET /channelgroups/1
  def show
    render json: @channelgroup
  end

  # POST /channelgroups
  def create
    @channelgroup = Channelgroup.new(channelgroup_params)

    if @channelgroup.save
      render json: @channelgroup, status: :created
    else
      render json: @channelgroup.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /channelgroups/1
  def update
    if @channelgroup.update(channelgroup_params)
      render json: @channelgroup
    else
      render json: @channelgroup.errors, status: :unprocessable_content
    end
  end

  # DELETE /channelgroups/1
  def destroy
    # could add destroy permissions in the future
    @channelgroup.destroy!
    render json: {message: 'Destroy successful'}, status: :accepted
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def ensure_admin_moderator
      authenticate_user!
      if !current_user.admin? && !current_user.moderator?
        render json: { message: "#{current_user.username} is not an administrator or moderator" }, status: :forbidden and return
      end
    end

    def set_channelgroup
      @channelgroup = Channelgroup.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def channelgroup_params
      params.expect(channelgroup: [:title, :description])
    end
end
