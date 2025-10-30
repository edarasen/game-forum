class Api::V1::ItchdataController < ApplicationController
  # GET api/v1/itchdata
  # Returns : @itchdata data is converted to json
  def index
    @itchdata = Itchdatum.all
    render json: @itchdata
  end
end
