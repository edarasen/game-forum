class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]
  before_action :authenticate_user!, only: %i[ create update destroy ]

  # GET api/v1/channels/:channel_id/posts
  # @param channel_id [Integer] the channel id specified in params
  # Returns : @posts data is converted to json using template in 'views/api/v1/posts/index.json.props'
  def index
    @channel = Channel.find(params.expect(:channel_id))
    @posts = @channel.posts
  end

  # GET api/v1/posts/:id
  # Uses before_action set_post to specify a post
  # Returns : @post data is converted to json using template in 'views/api/v1/posts/show.json.props'
  def show
  end

  # GET api/v1/latest
  # Returns : @posts data is converted to json using template in 'views/api/v1/posts/latest.json.props'
  def latest
    @posts = Post.order(created_at: :desc)
  end

  # POST api/v1/channels/:channel_id/posts
  # Checks channel's post_permission to see if current_user can create post
  # Uses before_action authenticate_user before the action proceeds
  # @param channel_id [Integer] the channel id specified in params
  # Returns : @post data is converted to json using template in 'views/api/v1/posts/create.json.props'
  # OR an error message if object fails to save due to invalid parameters
  def create
    @channel = Channel.find(params.expect(:channel_id))
    @post = @channel.posts.build(post_params)
    @post.user = current_user

    can_post = false
    case @channel.post_permission
    when 'admin_only'
      if current_user.admin?
        can_post = true
      end
    when 'admin_moderator_only'
      if current_user.admin? || current_user.moderator?
        can_post = true
      end
    when 'all_users'
      can_post = true
    end

    if can_post == false
      render json: {message: "User does not have the permission to post in this channel"}, status: :forbidden
    elsif can_post == true && @post.save
      # render json: @post, status: :created -> create.json.props
    else
      render json: @post.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT api/v1/posts/:id
  # Posts can only be updated by the creator or an admin/moderator
  # Uses before_action authenticate_user before the action proceeds
  # Uses before_action set_post to specify a channel
  # Returns : @post data is converted to json using template in 'views/api/v1/post/update.json.props'
  # OR an error message if conditions aren't fulfilled
  def update
    if @post.user == current_user || current_user.role != 'user'
      if !@post.update(post_params)
        render json: @post.errors, status: :unprocessable_content
      end
    else
      render json: {
        message: 'Invalid update request', 
        data: 'Cannot update posts that the current user did not author; exception : current user role is admin or moderator'
        }, status: :unprocessable_content
    end
  end

  # DELETE api/v1/posts/:id
  # Posts can only be deleted by the creator or an admin/moderator
  # Uses before_action authenticate_user before the action proceeds
  # Uses before_action set_post to specify a channel
  # Returns : json message: "Destroy successful" after destroy action is executed
  # OR an error message if conditions aren't fulfilled
  def destroy
    if @post.user == current_user || current_user.role != 'user'
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
    # Assigns a @post object before proceeding to next action
    # @param id [Integer] the post id specified in params
    def set_post
      @post = Post.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through
    # @param title [String] the post's title
    # @param body [String] the post's body
    def post_params
      params.expect(post: [:title, :body])
    end
end