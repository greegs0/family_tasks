class FamiliesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :create]
  before_action :set_family, only: [:show, :edit, :update, :destroy]

  def index
    @family = Family.new
  end

  def show
    # set_family
    @member = Member.new
    @members = current_user.family.members
    @chat = @family.chat
    @Message = Message.new
  end

  def new
    @family = Family.new
  end

  def create
    @family = Family.new(family_params)
    @family.user = current_user
    if @family.save!
      @chat = Chat.create!(family_id: @family.id, user_id: current_user.id)
      redirect_to family_path(@family), notice: "Family created succesfully ! Welcome !"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @family = Family.new(family_params)
  end

  def update
    if @family.update(family_params)
      redirect_to @family, notice: "Successfully updated"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @family.destroy
    redirect_to families_path, notice: "Family deleted."
  end

  private

  def set_family
    @family = Family.find(params[:id])
  end

  def family_params
    params.require(:family).permit(:name, :zipcode)
  end
end
