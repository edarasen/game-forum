class Api::V1::ItchdataController < ApplicationController
  def index
    @itchdata = Itchdatum.all
    render json: @itchdata
  end
end