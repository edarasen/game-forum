class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[show update destroy]
  before_action :role_check, only: %i[update destroy]
  def show
    @user = User.find(params[:id])
  end

  def update
    if !@user.update(user_params)
      render json: @user.errors, status: :unprocessable_content
    end
  end

  def destroy
    @user.update(deactivated: true)
    render json: {message: 'Deactivation successful'}, status: :accepted
  end

  def posts
    @user_posts = current_user.posts.includes(:comments).order(created_at: :desc)
    # Renamed from @posts to @user_posts to avoid any conflicts
  end

  def apply_moderator
    if current_user.not_applied?
      current_user.update(moderator_status: "pending")
    else
      render json: { message: "#{current_user.pending? ? "You have already applied" : "You are already approved"}" }, status: :unprocessable_entity
    end
  end

  private
  def role_check
    if !current_user.admin? && !current_user.moderator? && @user.id != current_user.id
      render json: { message: "#{current_user.username} cannot proceed with this action" }, status: :forbidden and return
    end
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.expect(user: [ :email, :password, :profile_picture, :username ])
  end
end
