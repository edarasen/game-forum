class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show update destroy ]
  before_action :deactivated_check, only: %i[ create update destroy ]
  before_action :authenticate_user!, only: %i[ create update destroy ]

  # GET api/v1/posts/:post_id/comments
  # @param post_id [Integer] the post id specified in params
  # Returns : @comments data is converted to json using template in 'views/api/v1/comments/index.json.props'
  def index
    @post = Post.find(params.expect(:post_id))
    @comments = @post.comments
  end

  # GET api/v1/comments/:id
  # Uses before_action set_comment to specify a comment
  # Returns : @comment data is converted to json using template in 'views/api/v1/comments/show.json.props'
  def show
  end

  # POST api/v1/posts/:post_id/comments
  # Uses before_action authenticate_user! before the action proceeds
  # @param post_id [Integer] the post id specified in params
  # Returns : @comment data is converted to json using template in 'views/api/v1/comments/create.json.props'
  # OR an error message if object fails to save due to invalid parameters
  def create
    @post = Post.find(params.expect(:post_id))
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if !@comment.save
      render json: @comment.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT api/v1/comments/:id
  # Comments can only be updated if done by the creator or an admin/moderator
  # Uses before_action authenticate_user! before the action proceeds
  # Uses before_action set_comment to specify a comment
  # Returns : @comment data is converted to json using template in 'views/api/v1/comments/update.json.props'
  # OR an error message if object fails to save due to invalid parameters
  def update
    if @comment.user == current_user || current_user.role != "user"
      if !@comment.update(comment_params)
        render json: @comment.errors, status: :unprocessable_content
      end
    else
      render json: {
        message: "Invalid update request",
        data: "Cannot update comments that the current user did not author; exception : current user role is admin or moderator"
      }, status: :unprocessable_content
    end
  end

  # DELETE /post/:id
  # Comments can only be deleted if done by the creator or an admin/moderator
  # Uses before_action authenticate_user! before the action proceeds
  # Uses before_action set_comment to specify a comment
  # Returns : json message: "Destroy successful" after destroy action is executed
  def destroy
    if @comment.user == current_user || current_user.role != "user"
      @comment.destroy!
      render json: { message: "Destroy successful" }, status: :accepted
    else
      render json: {
        message: "Invalid delete request",
        data: "Cannot delete comments that the current user did not author; exception : current user role is admin or moderator"
      }, status: :unprocessable_content
    end
  end

  private
  def deactivated_check
    if current_user.deactivated === true
      render json: { message: "Deactivated #{current_user.username} cannot proceed with this action" }, status: :forbidden and return
    end
  end
  # Assigns a @comment object before proceeding to next action
  # @param id [Integer] the comment id specified in params
  def set_comment
    @comment = Comment.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through
  # @param body [String] the comment's body
  def comment_params
    params.expect(comment: [ :body ])
  end
end
