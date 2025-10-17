class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show update destroy ]
  before_action :authenticate_user!, only: %i[ create update destroy ]

  # GET /comments
  def index
    @post = Post.find(params.expect(:post_id))
    @comments = @post.comments

    render json: @comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    @post = Post.find(params.expect(:post_id))
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /comment/1
  def update
    if @comment.user == current_user || current_user.role != 'user'
      if @comment.update(comment_params)
        render json: @comment
      else
        render json: @comment.errors, status: :unprocessable_content
      end
    else
      render json: {
        message: 'Invalid update request', 
        data: 'Cannot update comments that the current user did not author; exception : current user role is admin or moderator'
      }, status: :unprocessable_content
    end
  end

  # DELETE /post/1
  def destroy
    if @comment.user == current_user || current_user.role != 'user'
      @comment.destroy!
      render json: {message: 'Destroy successful'}, status: :accepted
    else
      render json: {
        message: 'Invalid delete request', 
        data: 'Cannot delete comments that the current user did not author; exception : current user role is admin or moderator'
      }, status: :unprocessable_content
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.expect(comment: [:body])
    end
end