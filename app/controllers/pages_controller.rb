class PagesController < ApplicationController

  def show
    @page = Page.find(params[:id])
    render json: @page
  end

  def find
    binding.pry
  end

end
