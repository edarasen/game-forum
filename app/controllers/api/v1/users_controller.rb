class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[show report apply_moderator posts]
  def show
    @user = User.find(params[:id])
    # render json: @user
  end

  def posts
    current_user.posts
  end

  def apply_moderator
    if current_user.not_applied?
      current_user.update(moderator_status: "pending")
      # render json: { message: "Moderator application now pending for approval." }, status: :ok
    else
      render json: { message: "#{current_user.pending? ? "You have already applied" : "You are already approved"}" }, status: :unprocessable_entity
    end
  end

  private

  def set_user
  @user = User.find(params[:id])
  end

  def user_params
    params.expect(user: [ :email, :password, :username ])
  end
end
