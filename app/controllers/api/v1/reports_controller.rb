class Api::V1::ReportsController < ApplicationController
  before_action :set_report, only: %i[ show destroy archive ]
  before_action :ensure_admin_moderator, only: %i[index show destroy archive show_archive]

  # GET api/v1/reports
  # Returns : @post_reports, @comment_reports data is converted to json using template in 'views/api/v1/reports/index.json.props'
  def index
    @post_reports = Report.posts.where(archive: false)
    @comment_reports = Report.comments.where(archive: false)
  end

  # GET api/v1/reports/:id
  # Uses before_action set_report to specify a report
  # Returns : @report data is converted to json using template in 'views/api/v1/reports/show.json.props'
  def show
  end

  # POST api/v1/reports
  # Checks if the post/comment exists before allowing the report to be made
  # Uses before_action ensure_admin_moderator before the action proceeds
  # Returns : @report data is converted to json using template in 'views/api/v1/reports/create.json.props'
  # OR an error message if object fails to save due to invalid parameters
  def create
    @report = Report.new(report_params)
    @report.user_id = current_user.id

    valid_content = false
    case @report.content_type
    when "post"
      reported_post = Post.find(@report.content_id)
      if !reported_post.nil?
        valid_content = true
      end
    when "comment"
      reported_comment = Comment.find(@report.content_id)
      if !reported_comment.nil?
        valid_content = true
      end
    end

    if !@report.save && !valid_content
      render json: @report.errors, status: :unprocessable_content
    end
  end

  # GET api/v1/reports/archive
  # Uses before_action ensure_admin_moderator before the action proceeds
  # Returns : data is converted to json using template in 'views/api/v1/reports/show_archive.json.props'
  def show_archive
    @post_reports = Report.posts.where(archive: true).order(:created_at)
    @comment_reports = Report.comments.where(archive: true).order(:created_at)
  end

  # PATCH api/v1/reports/archive/:id
  # Uses before_action ensure_admin_moderator before the action proceeds
  # Uses before_action set_report to specify a report
  # Returns : json message: "Archive successful" after Archive action is executed
  def archive
    @report.update(archive: true)
    render json: { message: "Archive successful" }, status: :accepted
  end

  # DELETE api/v1/reports/:id
  # Uses before_action ensure_admin_moderator before the action proceeds
  # Uses before_action set_report to specify a report
  # Returns : json message: "Destroy successful" after destroy action is executed
  def destroy
    @report.destroy!
    render json: { message: "Destroy successful" }, status: :accepted
  end

  private
  # Authenticates user and checks role of user
  # Returns : json message: current_user is not an administrator or moderator
  # OR proceeds to next action
  def ensure_admin_moderator
    authenticate_user!
    if !current_user.admin? && !current_user.moderator?
      render json: { message: "#{current_user.username} is not an administrator or moderator" }, status: :forbidden and return
    end
  end

  # Assigns a @report object before proceeding to next action
  # @param id [Integer] the report id specified in params
  def set_report
    @report = Report.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through
  # @param content_type [Enum:Integer] post or comment
  # @param id [Integer] the post/comment's id
  def report_params
    params.expect(report: [ :content_type, :content_id, :report_reason ])
  end
end
