class Api::V1::Admins::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_admin
  before_action :set_user, only: %i[ show update ban approve_moderator]

  def create
    @user = User.new(new_user_params)
    if @user.save
      # render json: { message: "#{@user.role} has been created!" }, status: :created
    else
      render json: { message: "Invalid credentials" }, status: :unprocessable_entity
    end
  end

  def show
    # render json: @user
  end

  def show_all
    @moderators = User.moderator
    @users = User.user
    # render :show_all, status: :ok
  end

  def show_reports
    @reports = Report.all
  end

  def update
    if @user.update(edit_user_params)
      # render json: { message: "Credentials updated!" }, status: :ok
    else
      render json: { message: "Invalid changes." }, status: :unprocessable_entity
    end
  end

  def approve_moderator
    if @user.pending?
      @user.update(moderator_status: "approved", mod_approval_date: Time.current)
      # render json: { message: "#{@user.username} is now a moderator." }, status: :ok
    else
      render json: { message: "#{@user.username} is already approved." }
    end
  end

  def ban
    if (@user.user? || @user.admin?) && !@user.deactivated?
      @user.update(deactivated: true, deactivated_at: Time.current)
      render json: { message: "#{@user.role} has been banned." }, status: :ok
    else
      render json: { message: "#{@user.role} is already banned" }, status: :unprocessable_entity
    end
  end

  private

  def ensure_admin
    if !current_user.admin?
      render json: { message: "#{current_user.username} is not an administrator" }, status: :forbidden and return
    end
  end

  def set_user
    @user = User.find(params[:id])
  end

  def new_user_params
    params.require(:user).permit(:email, :password, :username, :role)
  end

  def edit_user_params
    params.require(:user).permit(:email, :username, :role)
  end
end
