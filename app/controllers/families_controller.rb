class FamiliesController < ApplicationController
  before_action :set_family, only: [:show, :edit, :update, :destroy]

  def show
    @member = Member.new
  end

  def new
    @family = Family.new
  end

  def create
    @family = Family.new(family_params)
    if @family.save
      redirect_to @family, notice: "Family created succesfully ! Welcome !"
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
    @flat.destroy
    redirect_to families_path, notice: "Family deleted."
  end

  private

  def set_family
    @family = Family.find(params[:id])
  end

  def family_params
    params.require(:family).permit(:name, :zipcode, :user)
  end
end
