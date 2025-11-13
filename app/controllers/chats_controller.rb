class ChatsController < ApplicationController
  def show
    # @chat = Chat.find(params[:id])
    @chat = current_user.chats.find(params[:id])
  end
  def create
    @family = Family.find(params[:challenge_id])
    @chat = Chat.new(title: Chat::DEFAULT_TITLE) # Untitled
    @chat.family = @family
    @chat.user = current_user #user_id
    if @chat.save!
      # J'instancie un nouveau chat
      ai_chat = RubyLLM.chat
      # Je lui envoi un message par défaut initial et je récupère sa réponse dans response
      response = ai_chat.with_instruction(Chat::SYSTEM_PROMPT).ask()
      # Je créé un message à partir de la réponse que j'ai récupéré
      Message.create!(content: response.content)
      redirect_to chat_path(@chat)
    else
      render "challenges/show"
    end
  end
end
