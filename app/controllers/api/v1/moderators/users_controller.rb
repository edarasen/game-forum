class Api::V1::Moderators::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_moderator
  before_action :set_user, only: %i[ ban ]

  def show
    render json: @user
  end

  def update
    if @user.update(edit_user_params)
      render json: { message: "Credentials updated!" }, status: :ok
    else
      render json: { message: "Invalid changes." }, status: :unprocessable_entity
    end
  end

  def ban
    if @user.user? && !@user.deactivated?
      @user.update(deactivated: true, deactivated_at: Time.current)
      render json: { message: "#{@user.username} has been banned." }, status: :ok
    else
      render json: { message: "#{@user.username} is already banned" }, status: :unprocessable_entity
    end
  end

  private

  def ensure_moderator
    if !current_user.moderator? || !current_user.admin?
      render json: { message: "#{current_user.username} is not a moderator" }, status: :forbidden and return
    end
  end

  def set_user
    @user = User.find(params[:id])
  end

  def edit_user_params
    params.require(:user).permit(:email, :username)
  end
end
