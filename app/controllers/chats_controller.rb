class ChatsController < ApplicationController
  def show
    # @chat = Chat.find(params[:id])
    @chat = current_user.chats.find(params[:id])
  end

  def create; end

end
