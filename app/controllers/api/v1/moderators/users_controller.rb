class Api::V1::Moderators::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_moderator
  before_action :set_user, only: %i[ show update ban nuke_user ]

  def create
    @user = User.new(new_user_params)
    @user.role = "user"
    if @user.save
      # render json: { message: "#{@user.role} has been created!" }, status: :created
    else
      render json: { message: "Invalid credentials" }, status: :unprocessable_entity
    end
  end

  def show
    render json: @user
  end

  def show_all
    @moderators = User.moderator
    @users = User.user
    @admins = User.admin
    # render :show_all, status: :ok
  end

  def update
    if @user.admin? || @user.moderator?
      render json: { message: "Unable to modify #{@user.role}" }, status: :unprocessable_entity
    elsif @user.user?
      @user.update(edit_user_params)
      # render json: { message: "Credentials updated!" }, status: :ok
    else
      render json: { message: "Invalid changes." }, status: :unprocessable_entity
    end
  end

  def ban
    if @user.user? && !@user.deactivated?
      @user.update(deactivated: true, deactivated_at: Time.current)
      # render json: { message: "#{@user.username} has been banned." }, status: :ok
    elsif @user.admin? || @user.moderator?
      render json: { message: "Unable to ban #{@user.role}" }, status: :unprocessable_entity
    else
      render json: { message: "#{@user.username} is already banned" }, status: :unprocessable_entity
    end
  end

  def nuke_user
    if @user.user? && !@user.deactivated?
      # Delete all posts and comments
      @user.posts.destroy_all
      @user.comments.destroy_all

      # Deactivate user
      @user.update(deactivated: true, deactivated_at: Time.current)

      # Will render nuke_user.json.props
    elsif @user.admin? || @user.moderator?
      render json: { message: "Unable to nuke #{@user.role}" }, status: :unprocessable_entity
    else
      render json: { message: "#{@user.username} is already banned" }, status: :unprocessable_entity
    end
  end

  private

  def ensure_moderator
    if !current_user.moderator? && !current_user.admin?
      render json: { message: "#{current_user.username} is not a moderator" }, status: :forbidden and return
    end
  end

  def set_user
    @user = User.find(params[:id])
  end

  def new_user_params
    params.require(:user).permit(:email, :password, :username)
  end

  def edit_user_params
    params.require(:user).permit(:email, :username)
  end
end
