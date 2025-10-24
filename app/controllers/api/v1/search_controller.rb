class Api::V1::SearchController < ApplicationController
  def search
    @query = params[:query]
    
    @posts = Post.where("title=?", @query).or(Post.where("body=?",@query))
    @users = User.where("username=?", @query).where(deactivated: false)
    p "LOOK HERE"
    p @posts.inspect
    p @users.inspect
    # render -> search.json.props
  end
end