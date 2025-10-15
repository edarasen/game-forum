class Api::V1::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  private
  def user_params
    params.expect(user: [ :email, :password ])
  end
end
