class AddColumnEmailToSigners < ActiveRecord::Migration[5.2]
  def change
    add_column :signers, :email, :string
  end
end
