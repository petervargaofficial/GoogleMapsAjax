class PinsController < ApplicationController
  before_action :authenticate_user!

  def index
    @pins = Pin.all
    gon.push({:user_email => current_user.email})
    respond_to do |format|
      format.json { render json: @pins}
      format.html { render 'index'}
    end
  end

  def create
    @pin = Pin.new(pin_params)
    respond_to do |format|
      if @pin.save
        format.json { render json: @pin, status: :created}
      else
        format.json { render json: @pin.errors, status: :unprocessable_entity}
      end
    end
  end

  private
  def pin_params
    params.require(:pins).permit(:longitude, :latitude, :user_email)
  end

end
