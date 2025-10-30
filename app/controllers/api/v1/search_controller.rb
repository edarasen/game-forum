class Api::V1::SearchController < ApplicationController
  # GET api/v1/search?query=:query
  # Wildcard LIKE query to be able to search the query as a substring in the titles, bodies, usernames
  # @param query [String] the query specified in params
  # Returns : @posts, @users data is converted to json using template in 'views/api/v1/search/search.json.props'
  def search
    @query = params[:query].downcase
    @posts = Post.where("lower(title) LIKE ?", "%#{@query}%").or(Post.where("lower(body) LIKE ?", "%#{@query}%"))
    @users = User.where("username LIKE ?", "%#{@query}%").where(deactivated: false)
  end
end
