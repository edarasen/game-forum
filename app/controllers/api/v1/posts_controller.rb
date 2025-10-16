class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @channel = Channel.find(params.expect(:channel_id))
    @posts = @channel.posts

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /channels
  # Make sure to add authorization token in the headers to be able to POST
  def create
    @channel = Channel.find(params.expect(:channel_id))
    @post = @channel.posts.build(post_params)
    @post.user = current_user

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.user == current_user # || current_user.role != 'user'
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_content
      end
    else
      render json: {
        message: 'Invalid update request', 
        data: 'Cannot update posts that the current user did not author; exception : current user role is admin or moderator'
        }, status: :unprocessable_content
    end
  end

  # DELETE /posts/1
  def destroy
    if @post.user == current_user # || current_user.role != 'user'
      @post.destroy!
      render json: {message: 'Destroy successful'}, status: :accepted
    else
      render json: {
        message: 'Invalid delete request', 
        data: 'Cannot delete posts that the current user did not author; exception : current user role is admin or moderator'
      }, status: :unprocessable_content
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.expect(post: [:title, :body])
    end
end