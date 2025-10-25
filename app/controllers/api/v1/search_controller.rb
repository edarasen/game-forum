class Api::V1::SearchController < ApplicationController
  def search
    @query = params[:query].downcase

    @posts = Post.where("lower(title) LIKE ?", "%#{@query}%").or(Post.where("lower(body) LIKE ?", "%#{@query}%"))
    @users = User.where("username LIKE ?", "%#{@query}%").where(deactivated: false)
    # render json -> search.json.props
  end
end