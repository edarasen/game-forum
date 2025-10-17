class Api::V1::ReportsController < ApplicationController
  before_action :set_report, only: %i[ show destroy ]
  before_action :ensure_admin_moderator, only: %i[index show destroy]

  def index
    @post_reports = Report.posts
    @comment_reports = Report.comments
    # render json: {
    #   posts: @post_reports,
    #   comments: @comment_reports
    # } -> index.json.props
  end

  # GET /reports/1
  def show
    # render json: @report -> show.json.props
  end

  # POST /reports
  # Make sure to add authorization token in the headers to be able to POST
  def create
    @report = Report.new(report_params)
    @report.user_id = current_user.id

    valid_content = false
    case @report.content_type
    when 'post'
      reported_post = Post.find(@report.content_id)
      if !reported_post.nil?
        valid_content = true
      end
    when 'comment'
      reported_comment = Comment.find(@report.content_id)
      if !reported_comment.nil?
        valid_content = true
      end
    end

    if @report.save && valid_content
      # render json: @report, status: :created -> create.json.props
    else
      render json: @report.errors, status: :unprocessable_content
    end
  end

  # DELETE /reports/1
  def destroy
    # if current_user.role != 'user'
      @report.destroy!
      render json: {message: 'Destroy successful'}, status: :accepted
    # else
    #   render json: {
    #     message: 'Invalid delete request', 
    #     data: 'Cannot delete reports unless current user role is admin or moderator'
    #   }, status: :unprocessable_content
    # end
  end

  private

    def ensure_admin_moderator
      authenticate_user!
      if !current_user.admin? && !current_user.moderator?
        render json: { message: "#{current_user.username} is not an administrator or moderator" }, status: :forbidden and return
      end
    end

    def set_report
      @report = Report.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def report_params
      params.expect(report: [:content_type, :content_id])
    end
end