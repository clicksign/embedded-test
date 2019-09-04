class AddColumnEnvironmentIdToSigners < ActiveRecord::Migration[5.2]
  def change
    add_column :signers, :environment_id, :integer
  end
end
