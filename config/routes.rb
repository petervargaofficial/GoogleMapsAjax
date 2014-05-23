Rails.application.routes.draw do
  devise_for :users
  root 'pins#index'
  resources :pins
end

# Peters-MacBook-Pro:google_maps_ajax petervarga$ rake routes
#                   Prefix Verb   URI Pattern                    Controller#Action
#         new_user_session GET    /users/sign_in(.:format)       devise/sessions#new
#             user_session POST   /users/sign_in(.:format)       devise/sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)      devise/sessions#destroy
#            user_password POST   /users/password(.:format)      devise/passwords#create
#        new_user_password GET    /users/password/new(.:format)  devise/passwords#new
#       edit_user_password GET    /users/password/edit(.:format) devise/passwords#edit
#                          PATCH  /users/password(.:format)      devise/passwords#update
#                          PUT    /users/password(.:format)      devise/passwords#update
# cancel_user_registration GET    /users/cancel(.:format)        devise/registrations#cancel
#        user_registration POST   /users(.:format)               devise/registrations#create
#    new_user_registration GET    /users/sign_up(.:format)       devise/registrations#new
#   edit_user_registration GET    /users/edit(.:format)          devise/registrations#edit
#                          PATCH  /users(.:format)               devise/registrations#update
#                          PUT    /users(.:format)               devise/registrations#update
#                          DELETE /users(.:format)               devise/registrations#destroy
#                     root GET    /                              pins#index
#                     pins GET    /pins(.:format)                pins#index
#                          POST   /pins(.:format)                pins#create
#                  new_pin GET    /pins/new(.:format)            pins#new
#                 edit_pin GET    /pins/:id/edit(.:format)       pins#edit
#                      pin GET    /pins/:id(.:format)            pins#show
#                          PATCH  /pins/:id(.:format)            pins#update
#                          PUT    /pins/:id(.:format)            pins#update
#                          DELETE /pins/:id(.:format)            pins#destroy