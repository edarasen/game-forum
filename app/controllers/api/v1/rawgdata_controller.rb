class Api::V1::RawgdataController < ApplicationController
  def index
    @rawgdata = Rawgdatum.all
    render json: @rawgdata
  end
end