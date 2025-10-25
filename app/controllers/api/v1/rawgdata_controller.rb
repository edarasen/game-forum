class Api::V1::RawgdataController < ApplicationController
  # GET api/v1/rawgdata
  # Returns : @rawgdata data is converted to json
  def index
    @rawgdata = Rawgdatum.all
    render json: @rawgdata
  end
end